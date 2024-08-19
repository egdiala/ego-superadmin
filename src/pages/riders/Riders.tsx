import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { makeData } from "@/hooks/makeData";
import { useNavigate } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { Button, SearchInput, Table, TableAction } from "@/components/core";

export const RidersPage: React.FC = () => {
    const navigate = useNavigate();
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
      {
        header: () => "Creation Date",
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
        header: () => "Trips Taken",
        accessorKey: "phoneNumber",
      },
      {
        header: () => "Supervisor",
        accessorKey: "fullName",
      },
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
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Riders</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name, ref etc" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction theme="ghost" block>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
              <TableAction theme="grey" block>
                <Icon icon="mdi:funnel" className="size-4" />
                Filter
              </TableAction>
            </div>
            <div className="w-full sm:w-auto">
              <Button theme="primary" block>
                <Icon icon="ph:plus" className="size-4" />
                Add New Driver
              </Button>
            </div>
          </div>
        </div>
        <Table
            data={data}
            page={1}
            perPage={10}
            columns={columns}
            getData={getData}
            totalCount={dummyData.length}
            onPageChange={handlePageChange}
            onClick={() => navigate("/riders/1/profile")}
        />
      </div>
    </motion.div>
  )
}