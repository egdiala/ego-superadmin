import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams } from "@/hooks/usePaginationParams";

export const OEMsPage: React.FC = () => {
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)

    const columns = [
      {
        header: () => "Date Created",
        accessorKey: "createdAt",
      },
      {
        header: () => "Name",
        accessorKey: "station_name",
      },
      {
        header: () => "Models",
        accessorKey: "full_address",
      },
      {
        header: () => "Action",
        accessorKey: "action",
        cell: () => {
          return (
            <div className="flex items-center gap-6">
              <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm">View</button>
              <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm">
                Delete
              </button>
            </div>
          )
        }
      }
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend

    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location, setPage])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">OEMs</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="grey" block>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
            </div>
            <div className="w-full sm:w-auto">
              <Button type="button" theme="primary" block>
                <Icon icon="ph:plus" className="size-4" />
                Add New OEM
              </Button>
            </div>
          </div>
        </div>
          <Table
            data={[]}
            page={page}
            perPage={itemsPerPage}
            columns={columns}
            totalCount={0}
            onPageChange={handlePageChange}
            emptyStateText="We couldn't find any OEM in the system."
          />
      </div>
    </motion.div>
  )
}