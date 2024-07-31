import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetAdmins } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { CreateAdminModal, DeactivateAdminModal, EditAdminModal } from "@/components/pages/accounts";
import { FetchedAdminType } from "@/types/admin";

export const AccountsPage: React.FC = () => {
    const { data: admins, isFetching } = useGetAdmins()
    const [activeAdmin, setActiveAdmin] = useState("")
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
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedAdminType
          return (
            <div className="flex items-center gap-6">
              {item?.first_name} {item?.last_name}
            </div>
          )
        }
      },
      {
        header: () => "Email Address",
        accessorKey: "email",
      },
      {
        header: () => "Phone Number",
        accessorKey: "phone_number",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedAdminType
          return (
            <div className="flex items-center gap-6">
              {item?.phone_number || "-"}
            </div>
          )
        }
      },
      {
        header: () => "Admin Role",
        accessorKey: "role",
      },
      {
        header: () => "Actions",
        accessorKey: "actions",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedAdminType
          return (
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm"
                onClick={() => {
                  setActiveAdmin(item?.auth_id)
                  toggleEditAdmin()
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm"
                onClick={() => {
                  setActiveAdmin(item?.auth_id)
                  toggleDeactivateAdmin()
                }}
              >
                Deactivate
              </button>
            </div>
          )
        }
      }
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend
      
    };

    const getData = () => {
      // in a real page, this function would paginate the data from the backend
      
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
          <RenderIf condition={!isFetching}>
          <Table
              columns={columns}
              data={admins!}
              getData={getData}
              totalCount={admins?.length}
              onPageChange={handlePageChange}
          />
          </RenderIf>
          <RenderIf condition={isFetching}>
              <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
          </RenderIf>
          <CreateAdminModal isOpen={toggleModals.openCreateAdminModal} close={toggleCreateAdmin} />
          <EditAdminModal
            isOpen={toggleModals.openEditAdminModal}
            close={() => {
              toggleEditAdmin()
              setActiveAdmin("")
            }}
            admin_id={activeAdmin}
          />
          <DeactivateAdminModal 
            admin_id={activeAdmin} 
            close={() => {
              toggleDeactivateAdmin()
              setActiveAdmin("")
            }}
            isOpen={toggleModals.openDeactivateAdminModal} 
          />
        </motion.div>
    )
}