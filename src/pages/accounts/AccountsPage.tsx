import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAdmins } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useSearchParams } from "react-router-dom";
import type { FetchedAdminsCount, FetchedAdminType } from "@/types/admin";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { CreateAdminModal, DeactivateAdminModal, EditAdminModal } from "@/components/pages/accounts";

export const AccountsPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { value, onChangeHandler } = useDebounce(500)
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: count, isFetching: fetchingCount, refetch } = useGetAdmins({ component, q: value })
    const { data: admins, isFetching } = useGetAdmins({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })
    const [activeAdmin, setActiveAdmin] = useState<FetchedAdminType | null>(null)
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
        header: () => "Date & Time",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedAdminType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
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
        accessorKey: "role_data.name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedAdminType
          return (
            <div className="flex items-center gap-6">
              {item?.role_data?.name || "-"}
            </div>
          )
        }
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
                  setActiveAdmin(item)
                  toggleEditAdmin()
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className={cn(item?.status === 1 ? "text-semantics-error bg-semantics-error/10" : "text-green-1 bg-green-1/10", "rounded py-1 px-2  text-sm")}
                onClick={() => {
                  setActiveAdmin(item)
                  toggleDeactivateAdmin()
                }}
              >
                {item?.status === 1 ? "Deactivate" : "Activate"}
              </button>
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
            
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <TableAction type="button" theme="ghost" block onClick={() => component === "export" ? refetch() : setComponent("export")}>
                  <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                  Export
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
          <RenderIf condition={!isFetching && !fetchingCount}>
          <Table
              page={page}
              columns={columns}
              perPage={itemsPerPage}
              onPageChange={handlePageChange}
              data={(admins as FetchedAdminType[])}
              totalCount={(count as FetchedAdminsCount)?.total}
          />
          </RenderIf>
          <RenderIf condition={isFetching || fetchingCount}>
              <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
          </RenderIf>
          <CreateAdminModal isOpen={toggleModals.openCreateAdminModal} close={toggleCreateAdmin} />
          <EditAdminModal
            isOpen={toggleModals.openEditAdminModal}
            close={() => {
              toggleEditAdmin()
              setActiveAdmin(null)
            }}
            admin={activeAdmin!}
          />
          <DeactivateAdminModal 
            admin={activeAdmin!} 
            close={() => {
              toggleDeactivateAdmin()
              setActiveAdmin(null)
            }}
            isOpen={toggleModals.openDeactivateAdminModal} 
          />
        </motion.div>
    )
}