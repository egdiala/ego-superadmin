import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FetchedTripType } from "@/types/trips";
import { useDebounce } from "@/hooks/useDebounce";
import { PurchaseModel } from "@/types/organizations";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { formattedNumber, pascalCaseToWords } from "@/utils/textFormatter";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

export const CustomerTripPaymentPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status" | "count-status-rider" | "count-status-driver" | "count-monthly">("count")
    const { data: count, isFetching: fetchingCount } = useGetTrips({ component, user_type: "organization", auth_id: params?.id as string })
    const { data: driverTrips, isFetching } = useGetTrips({ user_type: "organization", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Trip Reference",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Payment Method",
        accessorKey: "org_data.purchase_model",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{pascalCaseToWords(PurchaseModel[item?.org_data?.purchase_model])}</div>
          )
        }
      },
      {
        header: () => "Amount",
        accessorKey: "ride_data.fare",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.ride_data?.fare)}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.charge_data.status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          const status = item?.ride_data?.charge_data?.status
          return (
            <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap", status === "pending" && "text-semantics-amber", status === "yes" && "text-semantics-success")}>
              <RenderIf condition={status === "pending"}>
                {status}
              </RenderIf>
              <RenderIf condition={status === "yes"}>
                Successful
              </RenderIf>
            </div>
          )
        }
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
                        <TableAction type="button" theme="ghost" block>
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