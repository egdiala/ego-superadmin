import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetCommutePayments } from "@/services/hooks/queries";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";

export const StaffCommuteReceivablesPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)
    const { data: receivables, isFetching: fetchingReceivables } = useGetCommutePayments<any[]>({ request_type: "1", status: "0" })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Total Number of business owing",
            accessorKey: "firstName",
        },
        {
            header: () => "Total amount being owed",
            accessorKey: "model",
        },
        {
            header: () => "Action",
            accessorKey: "action",
        },
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend
      
    };
  
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search reference" />
                </div>
            
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <TableAction type="button" theme="ghost" block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                    <TableAction type="button" theme="secondary" block>
                        <Icon icon="mdi:funnel" className="size-4" />
                        Filter
                    </TableAction>
                </div>
            </div>
            <RenderIf condition={!fetchingReceivables}>
                <Table
                    data={receivables ?? []}
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={[].length}
                    onPageChange={handlePageChange}
                />
            </RenderIf>
            <RenderIf condition={fetchingReceivables}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}