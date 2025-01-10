import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetChargeStations } from "@/services/hooks/queries";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import type { FetchedChargeStations, FetchedChargeStationsCount } from "@/types/charge-stations";
import { CreateStationModal, DeleteStationModal, EditStationModal, FailedStationUploadsModal } from "@/components/pages/charge-stations";
import { hasPermission, RenderFeature } from "@/hooks/usePermissions";

export const ChargeStationsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const { value, onChangeHandler } = useDebounce(500)
  const [searchParams, setSearchParams] = useSearchParams();
  const [failedUploads, setFailedUploads] = useState([])
  const [filters] = useState({
    start_date: "",
    end_date: "",
  })
  
  const { data: count, isFetching: fetchingCount } = useGetChargeStations<FetchedChargeStationsCount>({ component: "count", q: value, ...filters })
  const { data: chargeStations, isFetching } = useGetChargeStations<FetchedChargeStations[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

    const [toggleModals, setToggleModals] = useState({
        openCreateStationModal: false,
        openDeleteStationModal: false,
        openEditStationModal: false,
        openFailedUploadsModal: false,
        activeStation: null as null | FetchedChargeStations
    })
  
    const toggleCreateStation = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openCreateStationModal: !toggleModals.openCreateStationModal,
      }))
    },[toggleModals.openCreateStationModal])
  
    const toggleDeleteStation = useCallback((activeStation: null | FetchedChargeStations = null) => {
      setToggleModals((prev) => ({
        ...prev,
        activeStation: activeStation,
        openDeleteStationModal: !toggleModals.openDeleteStationModal,
      }))
    },[toggleModals.openDeleteStationModal])
  
    const toggleEditStation = useCallback((activeStation: null | FetchedChargeStations = null) => {
      setToggleModals((prev) => ({
        ...prev,
        activeStation: activeStation,
        openEditStationModal: !toggleModals.openEditStationModal,
      }))
    }, [toggleModals.openEditStationModal])
  
    const toggleFailedUploads = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openFailedUploadsModal: !toggleModals.openFailedUploadsModal,
      }))
    }, [toggleModals.openFailedUploadsModal])
    

    const columns = [
      {
        header: () => "Date of Registration",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedChargeStations
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Name",
        accessorKey: "station_name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedChargeStations
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.station_name}</div>
          )
        }
      },
      {
        header: () => "Address",
        accessorKey: "full_address",
      },
      {
        header: () => "Contact Phone",
        accessorKey: "contact_number",
      },
      {
        header: () => "Opening Hours",
        accessorKey: "opening_time",
      },
      {
        header: () => "Closing Hours",
        accessorKey: "closing_time",
      },
      (hasPermission("SETUP_CHARGE_STATION", "update") || hasPermission("SETUP_CHARGE_STATION", "delete")) && {
        header: () => "Action",
        accessorKey: "action",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedChargeStations
          return (
            <div className="flex items-center gap-6">
              <RenderFeature module="SETUP_CHARGE_STATION" permission="update">
                <button type="button" className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm" onClick={() => toggleEditStation(item)}>Edit</button>
              </RenderFeature>
              <RenderFeature module="SETUP_CHARGE_STATION" permission="delete">
                <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={() => toggleDeleteStation(item)}>
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
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Charge Stations</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search address" onChange={onChangeHandler} />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="grey" block>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
            </div>
            <RenderFeature module="SETUP_CHARGE_STATION" permission="create">
              <div className="w-full sm:w-auto">
                <Button type="button" theme="primary" onClick={toggleCreateStation} block>
                  <Icon icon="ph:plus" className="size-4" />
                  Add a New Charge Station
                </Button>
              </div>
            </RenderFeature>
          </div>
        </div>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <Table
            data={chargeStations ?? []}
            page={page}
            perPage={itemsPerPage}
            columns={columns.filter((column) => column !== false)}
            totalCount={count?.total}
            onPageChange={handlePageChange}
            onClick={({ original }) => navigate(`/charge-stations/${original?.station_id}`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <RenderFeature module="SETUP_CHARGE_STATION" permission="create">
        <CreateStationModal
          isOpen={toggleModals.openCreateStationModal}
          close={(v) => {
            toggleCreateStation()
            if (v?.length > 0) {
              setFailedUploads(v)
              toggleFailedUploads()
            }
          }}
        />
      </RenderFeature>
      <RenderFeature module="SETUP_CHARGE_STATION" permission="delete">
        <DeleteStationModal isOpen={toggleModals.openDeleteStationModal} station={toggleModals.activeStation} close={() => toggleDeleteStation(null)} />
      </RenderFeature>
      <RenderFeature module="SETUP_CHARGE_STATION" permission="update">
        <EditStationModal isOpen={toggleModals.openEditStationModal} station={toggleModals.activeStation} close={() => toggleEditStation(null)} />
      </RenderFeature>
      <RenderFeature module="SETUP_CHARGE_STATION" permission="create">
        <FailedStationUploadsModal isOpen={toggleModals.openFailedUploadsModal} data={failedUploads} close={toggleFailedUploads} />
      </RenderFeature>
    </motion.div>
  )
}