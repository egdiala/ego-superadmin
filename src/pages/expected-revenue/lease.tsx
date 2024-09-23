import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";

export const LeaseExpectedRevenuePage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Total No. of Registered Clients",
            accessorKey: "firstName",
        },
        {
            header: () => "No. of Invoices generated",
            accessorKey: "model",
        },
        {
            header: () => "Expected Revenue",
            accessorKey: "expected_revenue",
        },
        {
            header: () => "Remitted amount or Paid amount",
            accessorKey: "amount",
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
            <Table
                data={[]}
                page={page}
                columns={columns}
                perPage={itemsPerPage}
                totalCount={[].length}
                onPageChange={handlePageChange}
            />
        </motion.div>
    )
}