import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { setPaginationParams } from "@/hooks/usePaginationParams";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useGetNotifications } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";

export const NotificationsPage: React.FC = () => {  
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: notifications, isFetching } = useGetNotifications<any[]>({ page: page.toString(), item_per_page: itemsPerPage.toString() })
  const { data: notificationsCount, isFetching: fetchingCount } = useGetNotifications<{ total: number; }>({ component: "count" })

  const columns = [
    {
      header: () => "Date",
      accessorKey: "createdAt",
    },
    {
      header: () => "Message",
      accessorKey: "fullName",
    },
    {
      header: () => "",
      accessorKey: "email",
      cell: () => {
        return (
          <div className="size-1.5 rounded-full bg-semantics-error" />
        )
      }
    },
  ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-3xl">Notifications</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search name, ref etc" />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction type="button" theme="secondary" block>
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                    </div>
                </div>
                <RenderIf condition={!isFetching && !fetchingCount}>
                  <Table
                      page={page}
                      columns={columns}
                      perPage={itemsPerPage}
                      onPageChange={handlePageChange}
                      data={notifications ?? []}
                      totalCount={notificationsCount?.total}
                      emptyStateText="We couldn't find any notifications"
                  />
                </RenderIf>
                <RenderIf condition={isFetching || fetchingCount}>
                  <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}