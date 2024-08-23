import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { makeData } from "@/hooks/makeData";

export const ChargeStationsPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
        {
        header: () => "Date of Registration",
        accessorKey: "createdAt",
        },
        {
        header: () => "Name",
        accessorKey: "fullName",
        },
        {
        header: () => "Address",
        accessorKey: "address",
        },
        {
        header: () => "Contact Phone",
        accessorKey: "phoneNumber",
        },
        {
        header: () => "Opening Hours",
        accessorKey: "status",
        },
        {
            header: () => "Action",
            accessorKey: "action",
            cell: () => {
            return (
                <div className="flex items-center gap-6">
                    <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm">Edit</button>
                    <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm">
                        Delete
                    </button>
                </div>
            )
            }
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
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Charge Stations</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name, reference etc" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="grey" block>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
            </div>
            <div className="w-full sm:w-auto">
              <Button theme="primary" block>
                <Icon icon="ph:plus" className="size-4" />
                Add a New Charge Station
              </Button>
            </div>
          </div>
        </div>
          <Table
            columns={columns}
            data={data}
            page={1}
            perPage={10}
            getData={getData}
            totalCount={dummyData.length}
            onPageChange={handlePageChange}
          />
      </div>
    </motion.div>
  )
}