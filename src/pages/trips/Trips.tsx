import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { format, formatRelative } from "date-fns";
import type { FetchedTripType } from "@/types/trips";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const TripsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: count, isFetching: fetchingCount, refetch } = useGetTrips({ component })
    const { data: trips, isFetching } = useGetTrips({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })

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
        header: () => "Business Name",
        accessorKey: "ride_data.name",
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
        accessorKey: "progress",
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
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item.ride_data.stop_location[item.ride_data.stop_location.length - 1].address}</div>
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
                    <TableAction theme="grey" block>
                        <Icon icon="mdi:funnel" className="size-4" />
                        Filter
                    </TableAction>
                    </div>
                </div>
                <RenderIf condition={!isFetching && !fetchingCount}>
                  <Table
                      page={page}
                      data={trips as FetchedTripType[]}
                      columns={columns}
                      perPage={itemsPerPage}
                      totalCount={(count as any)?.total}
                      onPageChange={handlePageChange}
                      onClick={({ original }) => navigate(`/trips/${original?._id}`)}
                  />
                </RenderIf>
                <RenderIf condition={isFetching || fetchingCount}>
                  <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}