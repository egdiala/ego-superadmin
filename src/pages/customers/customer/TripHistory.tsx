import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import type { FetchedTripType } from "@/types/trips";
import { PurchaseModel } from "@/types/organizations";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, Table } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { cn } from "@/libs/cn";
import { TripsFilter } from "@/components/pages/trips";
import { ExportButton } from "@/components/shared/export-button";

export const CustomerTripHistoryPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
      start_date: "",
      end_date: "",
      vehicle_id: "",
      charge_status: "" as any
    })
    const [component, setComponent] = useState<"count" | "count-status" | "count-status-rider" | "count-status-driver" | "count-monthly" | "export">("count")
    const { data: count, isFetching: fetchingCount } = useGetTrips({ component, user_type: "organization", auth_id: params?.id as string, ...filters })
    const { data: driverTrips, isFetching } = useGetTrips({ user_type: "organization", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

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
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.start_address}</div>
          )
        }
      },
      {
        header: () => "Drop off",
        accessorKey: "ride_data.stop_location",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.stop_location?.at(item?.ride_data?.stop_location?.length - 1)?.address || item?.ride_data?.end_address}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.status",
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
    }, [location])
    
    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search reference" onChange={onChangeHandler} />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <ExportButton
                  onExport={() => setComponent("export")} 
                  onExported={() => {
                    if (!fetchingCount && component === "export") {
                      setComponent("count")
                    }
                  }} 
                  isLoading={fetchingCount}
                />
                <TripsFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} theme="secondary" />
            </div>
          </div>
        </div>
          <RenderIf condition={!isFetching && !fetchingCount}>
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
          </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </motion.div>
    )
}