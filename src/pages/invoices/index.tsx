import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const InvoicesPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    // const [component] = useState<"count" | "count-status">("count")

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Business name/staff name",
            accessorKey: "transaction_id",
        },
        {
            header: () => "Business model",
            accessorKey: "description",
        },
        {
            header: () => "Invoiced amount",
            accessorKey: "business_name",
        },
        {
            header: () => "Status",
            accessorKey: "transaction_type",
        },
        {
            header: () => "Action",
            accessorKey: "payment_method",
        },
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
      setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location])
  
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Invoices</h1>
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
                    columns={columns}
                    data={[]}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={[].length}
                    onPageChange={handlePageChange}
                    emptyStateText="We couldn't find any invoices."
                />
            </div>
        </motion.div>
    )
}