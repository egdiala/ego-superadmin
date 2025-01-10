import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/core/Button/Loader";
import { useGetVehicles } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { AddVehicleModal, VehiclesFilter } from "@/components/pages/vehicles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { FetchedVehicleCount, FetchedVehicleType } from "@/types/vehicles";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { RenderFeature } from "@/hooks/usePermissions";

export const VehiclesPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const { value, onChangeHandler } = useDebounce(500)
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  })
  const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
  const { data: count, isFetching: fetchingCount, refetch } = useGetVehicles({ component, q: value, ...filters })
  const { data: vehicles, isFetching } = useGetVehicles({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })
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
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
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
      header: () => "Vehicle OEM",
      accessorKey: "oem_vehdata.oem_name",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedVehicleType
        return (
          <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.oem_vehdata?.oem_name || "-"}</div>
        )
      }
    },
    {
      header: () => "Vehicle Model",
      accessorKey: "oem_vehdata.model_name",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedVehicleType
        return (
          <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.oem_vehdata?.model_name || "-"}</div>
        )
      }
    },
    {
      header: () => "Mileage",
      accessorKey: "mileage",
    },
    {
      header: () => "Company",
      accessorKey: "org_data?.name",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedVehicleType
        return (
          <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">
            {item?.org_data?.name || "CabZero"}
          </div>
        )
      }
    },
    {
      header: () => "Battery Status",
      accessorKey: "online", //will be changed when the accurate response is added in data returned
      cell: () => {
        return (
          <div className="flex items-center gap-1 text-dark-green-1"><Icon icon="material-symbols-light:bolt" className="text-green-1" />0%</div>
        )
      }
    },
    {
      header: () => "Driver Status",
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

  const handlePageChange = (page: number) => {
    // in a real page, this function would paginate the data from the backend
    setPage(page)
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
  };

  useEffect(() => {
    getPaginationParams(location, setPage, () => {})
  }, [location, setPage])

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
            <SearchInput placeholder="Search name, ref etc" onChange={onChangeHandler} />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="ghost" block onClick={() => component === "export" ? refetch() : setComponent("export")}>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
              <VehiclesFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} />
            </div>
            <RenderFeature module="VEHICLE_DATA" permission="create">
              <div className="w-full sm:w-auto">
                <Button theme="primary" onClick={toggleAddVehicle} block>
                  <Icon icon="ph:plus" className="size-4" />
                  Add New Vehicle
                </Button>
              </div>
            </RenderFeature>
          </div>
        </div>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <Table
            page={page}
            columns={columns}
            perPage={itemsPerPage}
            onPageChange={handlePageChange}
            data={(vehicles as FetchedVehicleType[]) ?? []}
            totalCount={(count as FetchedVehicleCount)?.total}
            onClick={({ original }) => navigate(`/vehicles/${original?.vehicle_id}/profile`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <RenderFeature module="VEHICLE_DATA" permission="create">
        <AddVehicleModal isOpen={toggleModals.openAddVehicleModal} close={toggleAddVehicle} />
      </RenderFeature>
    </motion.div>
  )
}