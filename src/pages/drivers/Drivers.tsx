import React from "react";
import { motion } from "framer-motion";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";
import { makeData } from "@/hooks/makeData";

export const DriversPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);
    const columns = [
      {
        header: () => "Reg. Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Name",
        accessorKey: "fullName",
      },
      {
        header: () => "Email",
        accessorKey: "email",
      },
      {
        header: () => "Phone Number",
        accessorKey: "phoneNumber",
      },
      {
        header: () => "Vehicle Assignment Status",
        accessorKey: "vehicleStatus",
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
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Drivers</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search name, ref etc" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <TableAction theme="ghost">
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                        <TableAction theme="grey">
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                        <Button theme="primary">
                            <Icon icon="ph:plus" className="size-4" />
                            Add New Driver
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={data}
                    getData={getData}
                    totalCount={dummyData.length}
                    onPageChange={handlePageChange}
                />
            </div>
        </motion.div>
    )
}