import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { DeleteStationModal, EditStationModal } from "@/components/pages/charge-stations";

export const ChargeStationsPage: React.FC = () => {
    const [toggleModals, setToggleModals] = useState({
        openDeleteStationModal: false,
        openEditStationModal: false,
    })
  
    const toggleDeleteStation = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteStationModal: !toggleModals.openDeleteStationModal,
      }))
    },[toggleModals.openDeleteStationModal])
  
    const toggleEditStation = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openEditStationModal: !toggleModals.openEditStationModal,
      }))
    },[toggleModals.openEditStationModal])
    

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
                    <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm" onClick={toggleEditStation}>Edit</button>
                    <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={toggleDeleteStation}>
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
            data={[]}
            page={1}
            perPage={10}
            columns={columns}
            totalCount={[].length}
            onPageChange={handlePageChange}
          />
      </div>
      <DeleteStationModal isOpen={toggleModals.openDeleteStationModal} close={toggleDeleteStation} />
      <EditStationModal isOpen={toggleModals.openEditStationModal} close={toggleEditStation} />
    </motion.div>
  )
}