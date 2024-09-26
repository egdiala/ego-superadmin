import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FetchedTripType } from "@/types/trips";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetTrips } from "@/services/hooks/queries";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const DriverPaymentPage: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status" | "count-status-rider" | "count-status-driver" | "count-monthly">("count")
    const { data: count, isFetching: fetchingCount } = useGetTrips({ component, q: value, user_type: "driver", auth_id: params?.id as string })
    const { data: trips, isFetching } = useGetTrips({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, user_type: "driver", auth_id: params?.id as string })

    const columns = [
      {
        header: () => "Payment Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Ref ID",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Driver's Salary",
        accessorKey: "ride_data.amount",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.ride_data?.amount)}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.charge_data.status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap", item?.ride_data?.charge_data?.status === "pending" && "text-semantics-amber", item?.ride_data?.charge_data?.status === "yes" && "text-semantics-success")}>
              <RenderIf condition={item?.ride_data?.charge_data?.status === "pending"}>
                {item?.ride_data?.charge_data?.status}
              </RenderIf>
              <RenderIf condition={item?.ride_data?.charge_data?.status === "yes"}>
                Successful
              </RenderIf>
            </div>
          )
        }
      }
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
      setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location, setPage])

    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
            <div className="flex flex-col md:flex-row gap-y-3 pt-6 pb-2 md:items-center justify-between">
              <div className="w-full md:w-1/3 xl:w-1/4">
                <SearchInput placeholder="Search name, ref etc" onChange={onChangeHandler} />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <TableAction theme="ghost" block>
                  <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                  Export
                </TableAction>
                <TableAction theme="secondary" block>
                  <Icon icon="mdi:funnel" className="size-4" />
                  Filter
                </TableAction>
              </div>
            </div>
            <Table
              columns={columns}
              data={(trips ?? []) as FetchedTripType[]}
              page={page}
              perPage={itemsPerPage}
              totalCount={(count as any)?.total}
              onPageChange={handlePageChange}
              emptyStateText="No payment has been made to this driver"
            />
          </motion.div>
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}