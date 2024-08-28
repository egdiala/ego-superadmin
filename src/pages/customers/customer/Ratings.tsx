import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { cn } from "@/libs/cn";
import { FetchedRating, FetchedRatingCountStatus } from "@/types/ratings";
import { useGetRatings } from "@/services/hooks/queries";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Loader } from "@/components/core/Button/Loader";
import { format, formatRelative } from "date-fns";

export const CustomerRatingsPage: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status">("count")
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetRatings({ component: "count-status", user_type: "organization", auth_id: params?.id as string })
    const { data: count, isFetching: fetchingCount } = useGetRatings({ component, user_type: "organization", auth_id: params?.id as string })
    const { data: ratings, isFetching } = useGetRatings({ user_type: "organization", auth_id: params?.id as string })

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRating
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split("at")[0]}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Trip ID",
        accessorKey: "fullName",
      },
      {
        header: () => "Sender's Name",
        accessorKey: "fullName",
      },
      {
        header: () => "Rating",
        accessorKey: "rating",
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
        { label: "Total ratings", value: (countStatus as FetchedRatingCountStatus)?.total, color: "bg-[#F8F9FB]" },
        { label: "Av. ratings", value: (countStatus as FetchedRatingCountStatus)?.rating?.toFixed(1) ?? "0", color: "bg-[#F6FBF6]" },
      ]
    },[countStatus])
    
    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount && !fetchingCountStatus}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-4">
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
              <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                  <div className="w-full md:w-1/3 xl:w-1/4">
                      <SearchInput placeholder="Search reference" />
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
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
              </div>
              <Table
                  page={page}
                  columns={columns}
                  perPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  totalCount={(count as any)?.total}
                  data={(ratings as FetchedRating[]) ?? []}
                  emptyStateText="You do not have any ratings."
              />
          </motion.div>
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount || fetchingCountStatus}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}