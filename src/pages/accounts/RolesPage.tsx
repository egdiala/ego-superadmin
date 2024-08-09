import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { FetchedRolesType } from "@/types/roles";
import { useGetRoles } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { DeleteRoleModal } from "@/components/pages/roles";
import { pageVariants } from "@/constants/animateVariants";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";

export const RolesPage: React.FC = () => {
    const navigate = useNavigate()
    const { data: roles, isFetching } = useGetRoles()
    const [activeItem, setActiveItem] = useState<FetchedRolesType | null>(null)
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
        accessorKey: "name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original
          return (
            <div className="flex items-center whitespace-nowrap">{item?.name}</div>
          )
        }
      },
      {
        header: () => "Permissions",
        accessorKey: "data",
        cell: ({ row }: { row: any; }) => {
          const items = row?.original?.data
            return (
              <div className="flex items-center gap-4">
                {
                  Object.keys(items)?.map((item) =>
                    <div key={item} className="flex items-center gap-1 rounded-full bg-grey-dark-4 py-1 px-2 text-sm text-grey-dark-2 capitalize">
                      <span>{items[item]?.length}</span>
                      <span>{item}</span>
                    </div>
                  )
                }
              </div>
            )
        }
      },
      {
        header: () => "Action",
        accessorKey: "action",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRolesType
          return (
              <div className="flex items-center gap-6">
                  <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm" onClick={() => navigate(`/accounts/roles/edit/${item?.role_id}`)}>Edit</button>
                  <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={() => {
                    setActiveItem(item)
                    toggleDeleteRole()
                  }}>
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

    const getData = () => {
      // in a real page, this function would paginate the data from the backend
      
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
        <RenderIf condition={!isFetching}>
          <Table
            columns={columns}
            data={roles!}
            getData={getData}
            perPage={10}
            totalCount={roles?.length}
            onPageChange={handlePageChange}
          />
        </RenderIf>
        <RenderIf condition={isFetching}>
            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
        <DeleteRoleModal role={activeItem} isOpen={toggleModals.openDeleteRoleModal} close={toggleDeleteRole} />
      </motion.div>
    )
}