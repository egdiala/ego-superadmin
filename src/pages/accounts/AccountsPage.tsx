import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { makeData } from "@/hooks/makeData";
import { pageVariants } from "@/constants/animateVariants";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { CreateAdminModal, DeactivateAdminModal, EditAdminModal } from "@/components/pages/accounts";

export const AccountsPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = useState(dummyData);
    const [toggleModals, setToggleModals] = useState({
        openCreateAdminModal: false,
        openDeactivateAdminModal: false,
        openEditAdminModal: false,
    })
  
    const toggleCreateAdmin = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openCreateAdminModal: !toggleModals.openCreateAdminModal,
      }))
    },[toggleModals.openCreateAdminModal])
  
    const toggleDeactivateAdmin = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeactivateAdminModal: !toggleModals.openDeactivateAdminModal,
      }))
    },[toggleModals.openDeactivateAdminModal])
  
    const toggleEditAdmin = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openEditAdminModal: !toggleModals.openEditAdminModal,
      }))
    },[toggleModals.openEditAdminModal])

    const columns = [
      {
        header: () => "Name",
        accessorKey: "fullName",
      },
      {
        header: () => "Department",
        accessorKey: "role",
      },
      {
        header: () => "Email Address",
        accessorKey: "email",
      },
      {
        header: () => "Admin Role",
        accessorKey: "role",
      },
      {
        header: () => "Actions",
        accessorKey: "actions",
        cell: () => {
            return (
                <div className="flex items-center gap-6">
                    <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm" onClick={toggleEditAdmin}>Edit</button>
                    <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={toggleDeactivateAdmin}>Deactivate</button>
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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search name" />
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
                        <Button theme="primary" onClick={toggleCreateAdmin} block>
                            <Icon icon="ph:plus" className="size-4" />
                            Add New Admin
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
            <CreateAdminModal isOpen={toggleModals.openCreateAdminModal} close={toggleCreateAdmin} />
            <EditAdminModal isOpen={toggleModals.openEditAdminModal} close={toggleEditAdmin} />
            <DeactivateAdminModal isOpen={toggleModals.openDeactivateAdminModal} close={toggleDeactivateAdmin} />
        </motion.div>
    )
}