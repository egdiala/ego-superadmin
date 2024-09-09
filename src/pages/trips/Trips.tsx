import React, { useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { format, formatRelative } from "date-fns";
import type { FetchedTripType } from "@/types/trips";
import { PurchaseModel } from "@/types/organizations";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { EmptyState, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { TripsFilter } from "@/components/pages/trips";

export const TripsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
      start_date: "",
      end_date: ""
    })
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: count, isFetching: fetchingCount, refetch } = useGetTrips({ component, q: value, ...filters })
    const { data: trips, isFetching } = useGetTrips({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

    const columns = [
      {
        header: () => "Date & Time",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split("at")[0]}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Trip Ref.",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Business",
        accessorKey: "org_data.name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.org_data?.name}</div>
          )
        }
      },
      {
        header: () => "Rider",
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
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{pascalCaseToWords(PurchaseModel[item?.org_data?.purchase_model] ?? "-") ?? "-"}</div>
          )
        }
      },
      {
        header: () => "Pickup",
        accessorKey: "ride_data.start_address",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 line-clamp-2">{item?.ride_data?.start_address}</div>
          )
        }
      },
      {
        header: () => "Drop off",
        accessorKey: "ride_data.end_address",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 line-clamp-2">{item?.ride_data?.stop_location?.[item?.ride_data?.stop_location?.length - 1]?.address || item?.ride_data?.end_address}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "ride_status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          const black = ["ENROUTE_TO_DROPOFF",]
          const blue = ["PICKED_RIDER",]
          const green = ["REQUEST_ACCEPTED",  "ARRIVED_AT_PICKUP", "COMPLETED"]
          const red = ["CANCELED"]
          return (
            <div className={cn("text-sm line-clamp-2 capitalize font-medium", green.includes(item?.ride_status) && "text-green-1", red.includes(item?.ride_status) && "text-semantics-error", blue.includes(item?.ride_status) && "text-[#0073C4]", black.includes(item?.ride_status) && "text-grey-dark-1" )}>{item?.ride_status.split("_").join(" ").toLowerCase()}</div>
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
    }, [location, setPage])
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Trips</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search name, ref etc" onChange={onChangeHandler} />
                    </div>
                
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <TableAction theme="ghost" block onClick={() => component === "export" ? refetch() : setComponent("export")}>
                          <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                          Export
                      </TableAction>
                      <TripsFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} />
                    </div>
                </div>
                <RenderIf condition={!isFetching && !fetchingCount}>
                  <RenderIf condition={trips !== undefined}>
                    <Table
                        page={page}
                        data={trips as FetchedTripType[]}
                        columns={columns}
                        perPage={itemsPerPage}
                        totalCount={(count as any)?.total}
                        onPageChange={handlePageChange}
                        emptyStateText="We couldn't find any trip in our system."
                        onClick={({ original }) => navigate(`/trips/${original?.trip_id}`)}
                    />
                  </RenderIf>
                  <RenderIf condition={trips === undefined}>
                    <EmptyState emptyStateText="We couldn't find any trip in our system." />
                  </RenderIf>
                </RenderIf>
                <RenderIf condition={isFetching || fetchingCount}>
                  <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}