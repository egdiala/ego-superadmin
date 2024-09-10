import React, { useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, SearchInput, Table, TableAction } from "@/components/core";

export const OutstandingPaymentPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
        },
        {
            header: () => "Trip Reference",
            accessorKey: "ref",
        },
        {
            header: () => "Staff Name",
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

    const trips = [
        { label: "Amount", value: "₦235,402,853", color: "bg-[#F8F9FB]" },
        { label: "Count", value: "2,853", color: "bg-green-4" },
    ]

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <Breadcrumb items={[{ label: "Outstanding Payment", link: "/outstanding-payment-log" }, { label: "Today • 12:34pm", link: "/outstanding-payment-log/1" }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search name, reference etc" />
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
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        trips.map((item) =>
                            <div key={item.label} className={cn("relative grid overflow-hidden content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                                <Icon icon="mdi:naira" className="absolute size-20 -left-4 self-center text-grey-dark-3 text-opacity-10" />
                                <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                                <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                            </div>
                        )
                    }
                </div>
                <Table
                    data={[]}
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={0}
                    onPageChange={handlePageChange}
                />
            </div>
        </motion.div>
    )
}