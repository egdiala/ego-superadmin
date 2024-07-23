import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";
import { makeData } from "@/hooks/makeData";
import { CreateDriverModal } from "@/components/pages/drivers";

export const DriversPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = useState(dummyData);
    const [toggleModals, setToggleModals] = useState({
        openFilterModal: false,
        openCreateDriverModal: false,
    })

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
  
    const toggleCreateDriver = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openCreateDriverModal: !toggleModals.openCreateDriverModal,
      }))
    },[toggleModals.openCreateDriverModal])
    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
        <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Drivers</h1>
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
                    <Button theme="primary" onClick={toggleCreateDriver} block>
                      <Icon icon="ph:plus" className="size-4" />
                      Add New Driver
                    </Button>
                  </div>
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
        <CreateDriverModal isOpen={toggleModals.openCreateDriverModal} close={toggleCreateDriver} />
      </motion.div>
    )
}