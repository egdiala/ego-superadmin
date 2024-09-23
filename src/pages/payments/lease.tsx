import React, { useState } from "react";
import { motion } from "framer-motion";
import { Table } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";

export const LeasePaymentLogPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Business Name",
            accessorKey: "firstName",
        },
        {
            header: () => "Model",
            accessorKey: "model",
        },
        {
            header: () => "Amount",
            accessorKey: "amount",
        },
        {
            header: () => "Status",
            accessorKey: "status",
        },
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend
      
    };
  
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
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