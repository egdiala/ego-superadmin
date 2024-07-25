import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";
import { makeData } from "@/hooks/makeData";
import { cn } from "@/libs/cn";

export const DriverRatingsPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = useState(dummyData);

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
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
        accessorKey: "status",
      },
      {
        header: () => "Comment",
        accessorKey: "email",
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
        { label: "Total ratings", value: "2,853", color: "bg-[#F8F9FB]" },
        { label: "Av. ratings", value: "5.0", color: "bg-[#F6FBF6]" },
    ]

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
            <div className="flex-1 grid grid-cols-2 gap-4 py-4">
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
                totalCount={dummyData.length}
                onPageChange={handlePageChange}
            />
        </motion.div>
    )
}