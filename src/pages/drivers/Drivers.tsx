import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";
import { CreateDriverModal } from "@/components/pages/drivers";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useGetDrivers } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { format, formatRelative } from "date-fns";
import type { FetchedDriverCount, FetchedDriverType } from "@/types/drivers";
import { cn } from "@/libs/cn";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const DriversPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: count, isFetching: fetchingCount } = useGetDrivers({ component: "count" })
  const { data: drivers, isFetching } = useGetDrivers({ page: page.toString(), item_per_page: itemsPerPage.toString() })
  const [toggleModals, setToggleModals] = useState({
    openFilterModal: false,
    openCreateDriverModal: false,
  })

  const columns = [
    {
      header: () => "Reg. Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split("at")[0]}</span> • {format(item?.createdAt, "p")}</div>
        )
      }
    },
    {
      header: () => "Name",
      accessorKey: "fullName",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.first_name} {item?.last_name}</div>
        )
      }
    },
    {
      header: () => "Email",
      accessorKey: "email",
    },
    {
      header: () => "Phone Number",
      accessorKey: "phone_number",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className="text-sm text-grey-dark-2 capitalize">{item?.phone_number || "-"}</div>
        )
      }
    },
    {
      header: () => "Vehicle Assignment Status",
      accessorKey: "vehicleStatus",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className={cn(item?.vehicle_id ? "bg-green-3" : "bg-yellow-3", "flex w-fit rounded items-center text-grey-dark-2 px-2 py-0.5 text-sm")}>{item?.vehicle_id ? "Assigned" : "Unassigned"}</div>
        )
      }
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className={cn(item?.status === 1 ? "text-dark-green-1" : "text-grey-dark-1", "font-medium text-sm")}>{item?.status === 1 ? "Active" : "Suspended"}</div>
        )
      }
    }
  ];

  const handlePageChange = (page: number) => {
    // in a real page, this function would paginate the data from the backend
    setPage(page)
      setPaginationParams(page, 10, searchParams, setSearchParams)
  };

  const toggleCreateDriver = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openCreateDriverModal: !toggleModals.openCreateDriverModal,
    }))
  }, [toggleModals.openCreateDriverModal])

  useEffect(() => {
    getPaginationParams(location, setPage, () => {})
  },[location])
  
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
        <RenderIf condition={!isFetching && !fetchingCount}>
          <Table
            page={page}
            columns={columns}
            perPage={itemsPerPage}
            onPageChange={handlePageChange}
            data={drivers as FetchedDriverType[] ?? []}
            totalCount={(count as FetchedDriverCount)?.total}
            onClick={({ original }) => navigate(`/drivers/${original?.driver_id}/profile`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <CreateDriverModal isOpen={toggleModals.openCreateDriverModal} close={toggleCreateDriver} />
    </motion.div>
  )
}