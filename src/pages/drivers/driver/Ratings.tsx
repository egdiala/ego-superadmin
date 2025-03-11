import React, { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetRatings } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { FetchedRating, FetchedRatingCountStatus } from "@/types/ratings";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { RenderIf, Table } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { ExportButton } from "@/components/shared/export-button";

export const DriverRatingsPage: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "dashboard-stat" | "export">("count")
    const { data: count, isFetching: fetchingCount } = useGetRatings({ component, user_type: "driver", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { data: ratings, isFetching } = useGetRatings({ user_type: "driver", auth_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString() })

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRating
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Trip ID",
        accessorKey: "trip_id",
      },
      {
        header: () => "Sender's Name",
        accessorKey: "sender_auth_id",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRating
          return (
            <div>{item?.sender_data?.first_name} {item?.sender_data?.last_name}</div>
          )
        }
      },
      {
        header: () => "Rating",
        accessorKey: "rating",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRating
          return (
            <div className="flex items-center gap-1"><Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />{item?.rating?.toFixed(1)}</div>
          )
        }
      },
      {
        header: () => "Comment",
        accessorKey: "comment",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRating
          return (
            <div>{item?.comment || "-"}</div>
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
          { label: "Total ratings", value: (count as FetchedRatingCountStatus)?.total, color: "bg-[#F8F9FB]" },
          { label: "Av. ratings", value: (count as FetchedRatingCountStatus)?.rating?.toFixed(1) ?? "0", color: "bg-[#F6FBF6]" },
      ]
    },[count])

    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {
                      trips.map((item) =>
                      <div key={item.label} className={cn("relative overflow-hidden grid content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                        <Icon icon="ph:star-fill" className="absolute size-20 -left-5 self-center text-grey-dark-3 text-opacity-10" />
                        <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                        <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                      </div>
                      )
                  }
              </div>
              <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-end">
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
                  </div>
              </div>
              <Table
                  columns={columns}
                  data={(ratings as FetchedRating[]) ?? []}
                  page={page}
                  perPage={itemsPerPage}
                  totalCount={(count as any)?.total}
                  onPageChange={handlePageChange}
              />
          </motion.div>
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}