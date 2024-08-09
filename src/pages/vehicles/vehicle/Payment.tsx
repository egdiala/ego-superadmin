import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";
import { makeData } from "@/hooks/makeData";

export const VehiclePaymentPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
      {
        header: () => "Reg. Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Payment ID",
        accessorKey: "age",
      },
      {
        header: () => "Payment Type",
        accessorKey: "status",
      },
      {
        header: () => "Amount",
        accessorKey: "progress",
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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
            <div className="w-full md:w-1/3 xl:w-1/4">
                <SearchInput placeholder="Search name, ref etc" />
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
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
            totalCount={data.length}
            onPageChange={handlePageChange}
          />
        </motion.div>
    )
}