import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import type { FetchedTripType } from "@/types/trips";
import { PurchaseModel } from "@/types/organizations";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { formattedNumber, pascalCaseToWords } from "@/utils/textFormatter";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { EmptyState, RenderIf, SearchInput, Table } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { TripsFilter } from "@/components/pages/trips";
import { ExportButton } from "@/components/shared/export-button";

export const TripsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const vehicleId = searchParams.get("vehicle_id")
    const chargeStatus = searchParams.get("charge_status") as "1" | "2" | "5"
    const purchaseModel = searchParams.get("purchase_model") as string
    

    const [filters, setFilters] = useState({
      start_date: searchParams.get("start_date") || "",
      end_date: searchParams.get("end_date") || "",
      vehicle_id: vehicleId || "",
      charge_status: chargeStatus || "",
      purchase_model: purchaseModel || ""
    })
    const [component, setComponent] = useState<"count" | "count-status" | "count-status-rider" | "count-status-driver" | "count-monthly" | "export">("count")
    const { data: count, isFetching: fetchingCount } = useGetTrips({ component, q: value, ...filters })
    const { data: trips, isFetching } = useGetTrips({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

    const columns = useMemo(() => {
      return [
        (chargeStatus && {
          header: () => "Charge Date & Time",
          accessorKey: "ride_data.charge_at",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedTripType
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.charge_at, "dd MMM, yyyy")}</span> • {format(item?.charge_at, "p")}</div>
                )
            }
        }),
        {
          header: () => !chargeStatus ? "Date & Time" : "Trip Date & Time",
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
          header: () => "Model",
          accessorKey: "ride_data.purchase_model",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedTripType
            return (
              <div className="text-sm text-grey-dark-2 whitespace-nowrap">{pascalCaseToWords(PurchaseModel[item?.ride_data?.purchase_model] ?? "-") ?? "-"}</div>
            )
          }
        },
        {
          header: () => "Paid By",
          accessorKey: "ride_data.payment_type",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedTripType
            return (
              <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.ride_data?.payment_type === 1 ? item?.org_data?.name : item?.ride_data?.name}</div>
            )
          }
        },
        {
          header: () => "Payment Status",
          accessorKey: "ride_data.name",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedTripType
            return (
              <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap px-2 py-0.5 rounded w-fit", item?.ride_data?.charge_data?.status === "pending" && "text-semantics-amber bg-semantics-amber/10", item?.ride_data?.charge_data?.status === "yes" && "text-semantics-success bg-semantics-success/10")}>
                  <RenderIf condition={item?.ride_data?.charge_data?.status === "pending"}>
                      {item?.ride_data?.charge_data?.status}
                  </RenderIf>
                  <RenderIf condition={item?.ride_data?.charge_data?.status === "yes"}>
                      Successful
                  </RenderIf>
              </div>
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
          header: () => "Vehicle",
          accessorKey: "driver_data.plate_number",
        },
        (vehicleId && {
          header: () => "Amount",
          accessorKey: "ride_data.fare",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedTripType
            return (
              <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.ride_data?.fare)}</div>
            )
          }
        }),
        {
          header: () => "Trip Status",
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
      ].filter((item) => (item !== null))
    }, [vehicleId]);

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location, setPage])
  
    useEffect(() => {
      if (page > 1) {
        setPage(1)
      }
    },[filters])
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Trips</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search ref" onChange={onChangeHandler} />
                    </div>
                
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
                      <TripsFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} />
                    </div>
                </div>
                <RenderIf condition={!isFetching && !fetchingCount}>
                  <RenderIf condition={trips !== undefined}>
                    <Table
                        page={page}
                        data={trips as FetchedTripType[]}
                        columns={columns as any[]}
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