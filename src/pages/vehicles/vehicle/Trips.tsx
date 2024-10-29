import React, { useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import type { FetchedTripType } from "@/types/trips";
import { useGetTrips } from "@/services/hooks/queries";
import { TripsFilter } from "@/components/pages/trips";
import { Loader } from "@/components/core/Button/Loader";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { pageVariants } from "@/constants/animateVariants";
import { PurchaseModel } from "@/types/organizations";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { setPaginationParams, getPaginationParams } from "@/hooks/usePaginationParams";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";

export const VehicleTripsPage: React.FC = () => {
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
      vehicle_id: params?.id as string,
      charge_status: "" as any
    })
    const { data: count, isFetching: fetchingCount } = useGetTrips({ component: "count", ...filters })
    const { data: vehicleTrips, isFetching } = useGetTrips({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

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
        header: () => "Business Name",
        accessorKey: "org_data.name",
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
            <div className="line-clamp-1">{item?.ride_data?.start_address}</div>
          )
        }
      },
      {
        header: () => "Drop Off",
        accessorKey: "ride_data.end_address",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="line-clamp-1">{item?.ride_data?.end_address}</div>
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
      }
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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search trip ref" onChange={onChangeHandler} />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <TableAction theme="ghost" block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                    <TripsFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} theme="secondary" />
                </div>
            </div>
            <RenderIf condition={!isFetching && !fetchingCount}>
                <Table
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    data={(vehicleTrips as FetchedTripType[]) ?? []}
                    totalCount={(count as any)?.total}
                    emptyStateText="No trip has been made with this vehicle"
                    onClick={({ original }) => navigate(`/trips/${original?.trip_id}`)}
                />
            </RenderIf>
            <RenderIf condition={isFetching && fetchingCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}