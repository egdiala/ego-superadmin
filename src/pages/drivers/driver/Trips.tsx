import React, { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetTrips } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Loader } from "@/components/core/Button/Loader";
import type { FetchedTripCountStatus, FetchedTripType } from "@/types/trips";
import { format, formatRelative } from "date-fns";

export const DriverTripsPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetTrips({ component: "count-status", user_type: "driver", auth_id: params?.id as string })
    const { data: count, isFetching: fetchingCount, refetch } = useGetTrips({ component, user_type: "driver", auth_id: params?.id as string })
    const { data: driverTrips, isFetching } = useGetTrips({ user_type: "driver", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })

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
        header: () => "Trip Req. ID.",
        accessorKey: "trip_id",
      },
      {
        header: () => "Payment Model",
        accessorKey: "ride_data.payment_method",
      },
      {
        header: () => "Payment Status",
        accessorKey: "ride_data.charge_data.status",
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
          { label: "Total Assigned Trips", value: (countStatus as FetchedTripCountStatus)?.total, color: "bg-[#F8F9FB]" },
          { label: "Fulfilled Trips", value: (countStatus as FetchedTripCountStatus)?.fulfilled || "0", color: "bg-[#F6FBF6]" },
          { label: "Ongoing Trips", value: (countStatus as FetchedTripCountStatus)?.ongoing || "0", color: "bg-yellow-4" },
          { label: "Rejected Trips", value: (countStatus as FetchedTripCountStatus)?.rejected || "0", color: "bg-[#FDF2F2]" },
      ]
    },[countStatus])
    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount && !fetchingCountStatus}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
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
            <Table
              page={page}
              columns={columns}
              perPage={itemsPerPage}
              onPageChange={handlePageChange}
              data={(driverTrips as FetchedTripType[]) ?? []}
              totalCount={(count as any)?.total}
              onClick={({ original }) => navigate(`/trips/${original?.trip_id}`)}
            />
          </motion.div>
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount || fetchingCountStatus}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}