import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";
import { cn } from "@/libs/cn";

export const ServiceRequestsPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)

    const columns = [
      {
        header: () => "Date & Time",
        accessorKey: "createdAt",
      },
      {
        header: () => "Request Type",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Vehicle Plate No.",
        accessorKey: "org_data.name",
      },
      {
        header: () => "Milage",
        accessorKey: "ride_data.name",
      },
      {
        header: () => "Battery Health",
        accessorKey: "driver_data.name",
      },
      {
        header: () => "Driver Name",
        accessorKey: "org_data.purchase_model",
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.start_address",
      },
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
    };

    const requests = [
        { label: "Total Request", value: "0", className: "bg-[#F8F9FB]" },
        { label: "Completed Requests", value: "0", className: "bg-green-4" },
        { label: "Pending Requests", value: "0", className: "bg-yellow-4" },
        { label: "Rejected Requests", value: "0", className: "bg-light-red" },
    ]
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Service Request</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
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
                <div className="grid grid-cols-4 gap-4">
                    {
                        requests.map((request) =>
                            <div className={cn("grid gap-1 p-4 rounded-lg relative overflow-hidden", request.className)}>
                                <Icon icon="heroicons:wrench-screwdriver-solid" className="absolute -left-7 inset-y-0 my-auto text-grey-dark-3/10 size-20" />
                                <h5 className="text-sm text-grey-dark-2 text-center">{request.label}</h5>
                                <p className="text-3xl text-grey-dark-1 text-center">{request.value}</p>
                            </div>
                        )
                    }
                </div>
                <Table
                    page={page}
                    data={[]}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={[].length}
                    onPageChange={handlePageChange}
                    emptyStateText="No service request has been made."
                />
            </div>
        </motion.div>
    )
}