import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";
import { makeData } from "@/hooks/makeData";
import { cn } from "@/libs/cn";

export const RiderWalletPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = useState(dummyData);

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Transaction ID",
        accessorKey: "fullName",
      },
      {
        header: () => "Transaction type",
        accessorKey: "email",
      },
      {
        header: () => "Description",
        accessorKey: "description",
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
      }
    ];

    const paginateData = (currentPage: number, rowsPerPage: number) => {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const newData = dummyData.slice(startIndex, endIndex);
      setData(newData);
    };

    const handlePageChange = (currentPage: number, rowsPerPage: number) => {
      // in a real page, this function would paginate the data from the backend
      paginateData(currentPage, rowsPerPage);
    };

    const getData = (currentPage: number, rowsPerPage: number) => {
      // in a real page, this function would paginate the data from the backend
      paginateData(currentPage, rowsPerPage);
    };

    const trips = [
        { label: "Wallet balance", value: "₦0", color: "bg-[#F8F9FB]" },
        { label: "Inflow", value: "₦0", color: "bg-green-4" },
        { label: "Outflow", value: "₦0", color: "bg-[#FDF2F2]" },
    ]

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
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
            <div className="flex flex-col md:flex-row gap-y-3 pt-6 pb-2 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search name, ref etc" />
                </div>
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
            <Table
                columns={columns}
                data={data}
                getData={getData}
                page={1}
                perPage={10}
                totalCount={dummyData.length}
                onPageChange={handlePageChange}
            />
        </motion.div>
    )
}