import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { PurchaseModel } from "@/types/organizations";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedRiderTripCountStatus, FetchedTripType } from "@/types/trips";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

export const RiderTripsPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status-rider" | "count-status">("count")
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetTrips({ component: "count-status-rider", user_type: "rider", auth_id: params?.id as string })
    const { data: count, isFetching: fetchingCount } = useGetTrips({ component, user_type: "rider", auth_id: params?.id as string })
    const { data: riderTrips, isFetching } = useGetTrips({ user_type: "rider", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })

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
        header: () => "Payment Model",
        accessorKey: "org_data.purchase_model",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{pascalCaseToWords(PurchaseModel[item?.org_data?.purchase_model] ?? "-") ?? "-"}</div>
          )
        }
      },
      {
        header: () => "Payment Method",
        accessorKey: "ride_data.charge_data.method",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedTripType
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.charge_data?.method}</div>
          )
        }
      },
      {
        header: () => "Payment Status",
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
      {
        header: () => "Business Name",
        accessorKey: "org_data.name",
      },
      {
        header: () => "Requester",
        accessorKey: "ride_data.name",
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

    const trips = useMemo(() => {
      return [
          { label: "Total Requests Made", value: (countStatus as FetchedRiderTripCountStatus)?.total_count_trip, color: "bg-[#F8F9FB]" },
          { label: "Approved Trips", value: (countStatus as FetchedRiderTripCountStatus)?.total_approved, color: "bg-[#F8F9FB]" },
          { label: "Ongoing Trips", value: (countStatus as FetchedRiderTripCountStatus)?.total_count_sch, color: "bg-yellow-4" },
          { label: "Fulfilled Trips", value: (countStatus as FetchedRiderTripCountStatus)?.total_count_trip, color: "bg-[#F6FBF6]" },
          { label: "Unfulfilled Trips", value: (countStatus as FetchedRiderTripCountStatus)?.total_rejected, color: "bg-[#FDF2F2]" },
          { label: "Rejected Trips", value: (countStatus as FetchedRiderTripCountStatus)?.total_rejected, color: "bg-[#FDF2F2]" },
      ]
    },[countStatus])
    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {
                trips.map((item) =>
                <div key={item.label} className={cn("relative grid overflow-hidden content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                  <Icon icon="bx:trip" className="absolute size-20 -left-4 self-center text-grey-dark-3 text-opacity-10" />
                  <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                  <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                </div>
                )
            }
        </div>
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
              <SearchInput placeholder="Search name, ref etc" onChange={onChangeHandler} />
          </div>
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
        <RenderIf condition={!isFetching && !fetchingCount && !fetchingCountStatus}>
          <Table
            page={page}
            columns={columns}
            perPage={itemsPerPage}
            onPageChange={handlePageChange}
            data={(riderTrips as FetchedTripType[]) ?? []}
            totalCount={(count as any)?.total}
            onClick={({ original }) => navigate(`/trips/${original?.trip_id}`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount || fetchingCountStatus}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </motion.div>
    )
}