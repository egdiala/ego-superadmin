import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { CreateOEMModal, DeleteOEMModal } from "@/components/pages/oem";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetOEMs } from "@/services/hooks/queries/useOEMs";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Button, RenderIf, SearchInput, Table } from "@/components/core";
import type { FetchedOEMType } from "@/types/oem";
import { RenderFeature } from "@/hooks/usePermissions";
import { ExportButton } from "@/components/shared/export-button";

export const OEMsPage: React.FC = () => {
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const [component, setComponent] = useState<"export" | "">("")
  const { data: oems, isFetching } = useGetOEMs({ component })
  const [toggleModals, setToggleModals] = useState({
    openCreateOemModal: false,
    openDeleteOemModal: false,
    activeOem: null as null | FetchedOEMType
  })
  
  const toggleCreateOem = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openCreateOemModal: !toggleModals.openCreateOemModal,
    }))
  },[toggleModals.openCreateOemModal])

  const toggleDeleteOem = useCallback((item: FetchedOEMType | null = null) => {
    setToggleModals((prev) => ({
      ...prev,
      activeOem: item,
      openDeleteOemModal: !toggleModals.openDeleteOemModal,
    }))
  }, [toggleModals.openDeleteOemModal])

  const columns = [
    {
      header: () => "Date Created",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedOEMType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
        )
      }
    },
    {
      header: () => "Name",
      accessorKey: "oem_name",
    },
    {
      header: () => "Models",
      accessorKey: "model_data.length",
    },
    {
      header: () => "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedOEMType
        return (
          <div className="flex items-center gap-6">
            <Link to={`/oem/${item?.oem_id}`} className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm">View</Link>
            <RenderFeature module="SETUP_OEMS" permission="delete">
              <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={() => toggleDeleteOem(item)}>
                Delete
              </button>
            </RenderFeature>
          </div>
        )
      }
    }
  ];

  const handlePageChange = () => {
    // in a real page, this function would paginate the data from the backend
    setPage(page)
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
  };

  useEffect(() => {
    getPaginationParams(location, setPage, () => {})
  }, [location, setPage])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">OEMs</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ExportButton 
                onExport={() => setComponent("export")} 
                onExported={() => {
                  if (!isFetching && component === "export") {
                    setComponent("")
                  }
                }} 
                isLoading={isFetching} 
              />
            </div>
            <RenderFeature module="SETUP_OEMS" permission="create">
              <div className="w-full sm:w-auto">
                <Button type="button" theme="primary" onClick={toggleCreateOem} block>
                  <Icon icon="ph:plus" className="size-4" />
                  Add New OEM
                </Button>
              </div>
            </RenderFeature>
          </div>
        </div>
        <RenderIf condition={!isFetching}>
          <Table
            data={oems ?? []}
            page={page}
            perPage={itemsPerPage}
            columns={columns}
            totalCount={0}
            onPageChange={handlePageChange}
            emptyStateText="We couldn't find any OEM in the system."
          />
        </RenderIf>
        <RenderIf condition={isFetching}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <RenderFeature module="SETUP_OEMS" permission="create">
        <CreateOEMModal isOpen={toggleModals.openCreateOemModal} close={toggleCreateOem} />
      </RenderFeature>
      <RenderFeature module="SETUP_OEMS" permission="delete">
        <DeleteOEMModal oem={toggleModals.activeOem!} isOpen={toggleModals.openDeleteOemModal} close={() => toggleDeleteOem(null)} />
      </RenderFeature>
    </motion.div>
  )
}