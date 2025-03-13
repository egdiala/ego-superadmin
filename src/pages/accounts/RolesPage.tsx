import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetRoles } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { DeleteRoleModal } from "@/components/pages/roles";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedRolesCount, FetchedRolesType } from "@/types/roles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { hasPermission, RenderFeature } from "@/hooks/usePermissions";

export const RolesPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { value, onChangeHandler } = useDebounce(500)
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: count, isFetching: fetchingCount, refetch } = useGetRoles({ component, q: value })
    const { data: roles, isFetching } = useGetRoles({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })
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
        header: () => "Date & Time",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
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
      (hasPermission("SETUP_ADMIN_ROLE", "update") || hasPermission("SETUP_ADMIN_ROLE", "update")) && {
        header: () => "Action",
        accessorKey: "action",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRolesType
          return (
              <div className="flex items-center gap-6">
                <RenderFeature module="SETUP_ADMIN_ROLE" permission="update">
                  <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm" onClick={() => navigate(`/accounts/roles/edit/${item?.role_id}`)}>Edit</button>
                </RenderFeature>
                <RenderFeature module="SETUP_ADMIN_ROLE" permission="delete">
                  <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={() => {
                    setActiveItem(item)
                    toggleDeleteRole()
                  }}>
                    Delete
                  </button>
                </RenderFeature>
              </div>
          )
        }
      }
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location, setPage])
  
    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name" onChange={onChangeHandler} />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <TableAction type="button" theme="ghost" block onClick={() => component === "export" ? refetch() : setComponent("export")}>
              <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
              Export
            </TableAction>
            <RenderFeature module="SETUP_ADMIN_ROLE" permission="create">
              <Button theme="primary" onClick={() => navigate("/accounts/roles/create")} block>
                <Icon icon="ph:plus" className="size-4" />
                Add New Role
              </Button>
            </RenderFeature>
          </div>
        </div>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <Table
            page={page}
            columns={columns.filter((column) => !!column)}
            perPage={itemsPerPage}
            onPageChange={handlePageChange}
            data={roles as FetchedRolesType[] ?? []}
            totalCount={(count as FetchedRolesCount)?.total}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
        <RenderFeature module="SETUP_ADMIN_ROLE" permission="delete">
          <DeleteRoleModal role={activeItem} isOpen={toggleModals.openDeleteRoleModal} close={toggleDeleteRole} />
        </RenderFeature>
      </motion.div>
    )
}