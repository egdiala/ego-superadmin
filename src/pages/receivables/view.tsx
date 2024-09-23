import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, SearchInput, Table, TableAction } from "@/components/core";


export const ViewReceivablesPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Business / Staff name",
            accessorKey: "firstName",
        },
        {
            header: () => "Total amount being owed",
            accessorKey: "model",
        },
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend
      
    };

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <Breadcrumb items={[{ label: "Receivables", link: "/receivables" }, { label: "Today • 12:34pm invoices", link: "#" }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
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
                <Table
                    data={[]}
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={[].length}
                    onPageChange={handlePageChange}
                />
            </div>
        </motion.div>
    )
}