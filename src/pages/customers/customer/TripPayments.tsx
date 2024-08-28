import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FetchedTripType } from "@/types/trips";

export const CustomerTripPaymentPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: count, isFetching: fetchingCount, refetch } = useGetTrips({ component, user_type: "organization", auth_id: params?.id as string })
    const { data: driverTrips, isFetching } = useGetTrips({ user_type: "organization", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Trip Reference",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Payment Ref",
        accessorKey: "first_name",
      },
      {
        header: () => "Payment Method",
        accessorKey: "ride_data.charge_data.method",
      },
      {
        header: () => "Amount",
        accessorKey: "ride_data.fare",
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.charge_data.status",
      },
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
      setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location])
    
    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search reference" onChange={onChangeHandler} />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction type="button" theme="ghost" block onClick={() => component === "export" ? refetch() : setComponent("export")}>
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                        <TableAction theme="secondary" block>
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                    </div>
                </div>
            </div>
            <Table
              page={page}
              columns={columns}
              perPage={itemsPerPage}
              data={(driverTrips as FetchedTripType[]) ?? []}
              onPageChange={handlePageChange}
              totalCount={(count as any)?.total}
              emptyStateText="There are no trip payments for this customer."
              onClick={({ original }) => navigate(`/trips/${original?.trip_id}`)}
            />
          </motion.div>
        </RenderIf>

        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}