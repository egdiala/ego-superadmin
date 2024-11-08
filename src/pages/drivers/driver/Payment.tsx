import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";

export const DriverPaymentPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)


    const columns = [
      {
        header: () => "Payment Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Ref ID",
        accessorKey: "trip_ref",
      },
      {
        header: () => "Driver's Salary",
        accessorKey: "ride_data.amount",
      },
      {
        header: () => "Status",
        accessorKey: "ride_data.charge_data.status",
      }
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend

    };

    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
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
          data={[]}
          page={page}
          perPage={itemsPerPage}
          totalCount={0}
          onPageChange={handlePageChange}
          emptyStateText="No payment has been made to this driver"
        />
      </motion.div>
    )
}