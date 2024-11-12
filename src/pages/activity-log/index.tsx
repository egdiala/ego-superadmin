import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetActivityLogs } from "@/services/hooks/queries";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import type { FetchedActivityLog, FetchedAdminsCount } from "@/types/admin";
import { RenderIf, Table } from "@/components/core";

export const ActivityLogPage: React.FC = () => {  
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: activityLogs, isFetching } = useGetActivityLogs<FetchedActivityLog[]>({ page: page.toString(), item_per_page: itemsPerPage.toString() })
  const { data: logsCount, isFetching: fetchingCount } = useGetActivityLogs<FetchedAdminsCount>({ component: "count" })

  const columns = [
    {
      header: () => "Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedActivityLog
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
        )
      }
    },
    {
      header: () => "Admin Name",
      accessorKey: "user_data.first_name",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedActivityLog
        return (
          <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.user_data?.first_name.toLowerCase()} {item?.user_data?.last_name.toLowerCase()}</div>
        )
      }
    },
    {
      header: () => "Activity Description",
      accessorKey: "body",
    },
  ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-3xl">Activity Log</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <RenderIf condition={!isFetching && !fetchingCount}>
                  <Table
                      page={page}
                      columns={columns}
                      perPage={itemsPerPage}
                      onPageChange={handlePageChange}
                      data={activityLogs ?? []}
                      totalCount={logsCount?.total}
                  />
                </RenderIf>
                <RenderIf condition={isFetching || fetchingCount}>
                  <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}