import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { makeData } from "@/hooks/makeData";
import { pageVariants } from "@/constants/animateVariants";
import { DeleteRoleModal } from "@/components/pages/roles";
import { Button, SearchInput, Table, TableAction } from "@/components/core";
import { useNavigate } from "react-router-dom";

export const RolesPage: React.FC = () => {
    const navigate = useNavigate()
    const dummyData = makeData(50);
    const [data, setData] = useState(dummyData);
    const [toggleModals, setToggleModals] = useState({
        openDeleteRoleModal: false,
    })
  
    const toggleDeleteRole = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteRoleModal: !toggleModals.openDeleteRoleModal,
      }))
    },[toggleModals.openDeleteRoleModal])

    const columns = [
      {
        header: () => "Name",
        accessorKey: "fullName",
      },
      {
        header: () => "Permissions",
        accessorKey: "role",
      },
      {
        header: () => "Action",
        accessorKey: "action",
        cell: () => {
            return (
                <div className="flex items-center gap-6">
                    <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm" onClick={() => navigate("/accounts/roles/edit")}>Edit</button>
                    <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={toggleDeleteRole}>Delete</button>
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
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <TableAction theme="ghost" block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                    <Button theme="primary" onClick={() => navigate("/accounts/roles/create")} block>
                        <Icon icon="ph:plus" className="size-4" />
                        Add New Role
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
            <DeleteRoleModal isOpen={toggleModals.openDeleteRoleModal} close={toggleDeleteRole} />
        </motion.div>
    )
}