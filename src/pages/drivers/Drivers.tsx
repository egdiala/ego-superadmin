import React, { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetDrivers } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { CreateDriverModal, DriversFilter, FailedDriverUploadsModal } from "@/components/pages/drivers";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { FetchedDriverCount, FetchedDriverType } from "@/types/drivers";
import { Button, RenderIf, SearchInput, Table } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { RenderFeature } from "@/hooks/usePermissions";
import { ExportButton } from "@/components/shared/export-button";

export const DriversPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const { value, onChangeHandler } = useDebounce(500)
  const [failedUploads, setFailedUploads] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  })
  const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
  const { data: count, isFetching: fetchingCount } = useGetDrivers({ component, q: value, ...filters })
  const { data: drivers, isFetching } = useGetDrivers({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })
  const [toggleModals, setToggleModals] = useState({
    openFilterModal: false,
    openCreateDriverModal: false,
    openFailedUploadsModal: false,
  })

  const filteredDrivers = useMemo(() => {
    return (drivers as FetchedDriverType[])?.filter((driver) => !!driver?.createdAt)
  },[drivers])

  const columns = [
    {
      header: () => "Reg. Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedDriverType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
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
      header: () => "Assignment Status",
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
          <div className={cn(item?.status === 1 ? "text-dark-green-1" : "text-grey-dark-1", "font-medium text-sm")}>
            <RenderIf condition={item?.status === 1}>Active</RenderIf>
            <RenderIf condition={item?.status === 2}>Suspended</RenderIf>
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

  const toggleCreateDriver = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openCreateDriverModal: !toggleModals.openCreateDriverModal,
    }))
  }, [toggleModals.openCreateDriverModal])

  const toggleFailedUploads = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openFailedUploadsModal: !toggleModals.openFailedUploadsModal,
    }))
  }, [toggleModals.openFailedUploadsModal])

  useEffect(() => {
    getPaginationParams(location, setPage, () => {})
  }, [location])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Drivers</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name, ref etc" onChange={onChangeHandler} />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ExportButton 
                onExport={() => setComponent("export")} 
                onExported={() => {
                  if (!fetchingCount && component === "export") {
                    setComponent("count")
                  }
                }} 
                isLoading={fetchingCount} 
              />
              <DriversFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} />
            </div>
            <RenderFeature module="DRIVER_DATA" permission="create">
              <div className="w-full sm:w-auto">
                <Button theme="primary" onClick={toggleCreateDriver} block>
                  <Icon icon="ph:plus" className="size-4" />
                  Add New Driver
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
            data={filteredDrivers as FetchedDriverType[] ?? []}
            totalCount={(count as FetchedDriverCount)?.total}
            onClick={({ original }) => navigate(`/drivers/${original?.driver_id}/profile`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <RenderFeature module="DRIVER_DATA" permission="create">
        <FailedDriverUploadsModal
          isOpen={toggleModals.openFailedUploadsModal}
          data={failedUploads}
          close={toggleFailedUploads}
        />
        <CreateDriverModal
          isOpen={toggleModals.openCreateDriverModal}
          close={(v) => {
            toggleCreateDriver()
            if (v?.length > 0) {
              setFailedUploads(v)
              toggleFailedUploads()
            }
          }}
        />
      </RenderFeature>
    </motion.div>
  )
}