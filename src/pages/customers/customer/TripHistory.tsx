import React, { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import type { FetchedTripType } from "@/types/trips";
import { PurchaseModel } from "@/types/organizations";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

export const CustomerTripHistoryPage: React.FC = () => {
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
        header: () => "Date & Time",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Trip Ref.",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Bill to",
        accessorKey: "ride_data.bill_to",
      },
      {
        header: () => "Requester",
        accessorKey: "ride_data.name",
      },
      {
        header: () => "Driver",
        accessorKey: "driver_data.name",
      },
      {
        header: () => "Model",
        accessorKey: "org_data.purchase_model",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{PurchaseModel[item.org_data?.purchase_model]}</div>
          )
        }
      },
      {
        header: () => "Pickup",
        accessorKey: "ride_data.start_address",
      },
      {
        header: () => "Drop off",
        accessorKey: "ride_data.stop_location",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.stop_location?.at(item?.ride_data?.stop_location?.length - 1)?.address}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.status",
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
                emptyStateText="There are no trips for this customer."
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