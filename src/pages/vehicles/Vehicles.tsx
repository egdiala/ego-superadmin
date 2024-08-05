import React, { useCallback, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import { Loader } from "@/components/core/Button/Loader";
import { useGetVehicles } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedVehicleType } from "@/types/vehicles";
import { AddVehicleModal } from "@/components/pages/vehicles";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useNavigate } from "react-router-dom";

export const VehiclesPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: drivers, isFetching } = useGetVehicles({})
  const [toggleModals, setToggleModals] = useState({
    openFilterModal: false,
    openAddVehicleModal: false,
  })

  const columns = [
    {
      header: () => "Reg. Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedVehicleType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split(" at ")[0]}</span> • {format(item?.createdAt, "p")}</div>
        )
      }
    },
    {
      header: () => "Plate Number",
      accessorKey: "plate_number",
    },
    {
      header: () => "Serial Number",
      accessorKey: "car_number",
    },
    {
      header: () => "Mileage",
      accessorKey: "mileage",
    },
    {
      header: () => "Battery Status",
      accessorKey: "online", //will be changed when the accurate response is added in data returned
      cell: () => {
        return (
          <div className="flex items-center gap-1 text-dark-green-1"><Icon icon="material-symbols-light:bolt" className="text-green-1" />100%</div>
        )
      }
    },
    {
      header: () => "Driver Assign. Status",
      accessorKey: "driver_assigned",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedVehicleType
        return (
          <div className={cn(item?.driver_assigned ? "text-grey-dark-2 bg-green-3" : "text-grey-dark-1 bg-yellow-1", "w-fit rounded px-2 py-0.5 font-medium text-sm")}>{item?.driver_assigned ? "Assigned" : "Unassigned"}</div>
        )
      }
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedVehicleType
        return (
          <div className={cn(item?.status === 1 ? "text-green-1" : "text-semantics-error", "font-medium text-sm")}>{item?.status === 1 ? "Active" : "Inactive"}</div>
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

  const toggleAddVehicle = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openAddVehicleModal: !toggleModals.openAddVehicleModal,
    }))
  }, [toggleModals.openAddVehicleModal])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Vehicles</h1>
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
              <Button theme="primary" onClick={toggleAddVehicle} block>
                <Icon icon="ph:plus" className="size-4" />
                Add New Vehicle
              </Button>
            </div>
          </div>
        </div>
        <RenderIf condition={!isFetching}>
          <Table
            columns={columns}
            data={drivers ?? []}
            getData={getData}
            totalCount={drivers?.length}
            onPageChange={handlePageChange}
            onClick={({ original }) => navigate(`/vehicles/${original?.vehicle_id}/profile`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <AddVehicleModal isOpen={toggleModals.openAddVehicleModal} close={toggleAddVehicle} />
    </motion.div>
  )
}