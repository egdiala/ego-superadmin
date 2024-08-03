import React, { useCallback, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { format, formatRelative } from "date-fns";
import type { FetchedDriverType } from "@/types/drivers";
import { useGetDrivers } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { AddVehicleModal } from "@/components/pages/vehicles";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";

export const VehiclesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: drivers, isFetching } = useGetDrivers()
  const [toggleModals, setToggleModals] = useState({
    openFilterModal: false,
    openAddVehicleModal: false,
  })

  const columns = [
    {
      header: () => "Reg. Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split(" ")[0]}</span> • {format(item?.createdAt, "p")}</div>
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
            onClick={({ original }) => navigate(`/drivers/${original?.driver_id}/profile`)}
            getData={getData}
            totalCount={drivers?.length}
            onPageChange={handlePageChange}
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