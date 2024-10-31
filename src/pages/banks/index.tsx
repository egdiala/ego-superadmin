import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { getPaginationParams } from "@/hooks/usePaginationParams";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useGetFeeBanks } from "@/services/hooks/queries";
import { CreateBankModal, DeleteBankModal } from "@/components/pages/bank";
import type { FetchedFeeBank } from "@/types/banks";

export const BanksPage: React.FC = () => {
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const { data: feeBanks, isFetching } = useGetFeeBanks<FetchedFeeBank[]>({})
  const [toggleModals, setToggleModals] = useState({
    openCreateBankModal: false,
    openDeleteBankModal: false,
    activeBank: null as null | FetchedFeeBank
  })
  
  const toggleCreateBank = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openCreateBankModal: !toggleModals.openCreateBankModal,
    }))
  },[toggleModals.openCreateBankModal])

  const toggleDeleteBank = useCallback((item: FetchedFeeBank | null = null) => {
    setToggleModals((prev) => ({
      ...prev,
      activeBank: item,
      openDeleteBankModal: !toggleModals.openDeleteBankModal,
    }))
  }, [toggleModals.openDeleteBankModal])

  const columns = [
    {
      header: () => "Stakeholder",
      accessorKey: "stakeholder_name",
    },
    {
      header: () => "Bank Details",
      accessorKey: "bank_name",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedFeeBank
        return (
          <div className="flex items-center gap-6">
            {item?.bank_name}, {item?.account_number}
          </div>
        )
      }
    },
    {
      header: () => "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedFeeBank
        return (
          <div className="flex items-center gap-6">
            <button type="button" className="rounded bg-semantics-error/10 py-1 px-2 text-semantics-error text-sm" onClick={() => toggleDeleteBank(item)}>
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

  useEffect(() => {
    getPaginationParams(location, setPage, () => {})
  }, [location, setPage])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Bank Accounts</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search stakeholder" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="grey" block>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
            </div>
            <div className="w-full sm:w-auto">
              <Button type="button" theme="primary" onClick={toggleCreateBank} block>
                <Icon icon="ph:plus" className="size-4" />
                Add New Bank Account
              </Button>
            </div>
          </div>
        </div>
        <RenderIf condition={!isFetching}>
          <Table
            data={feeBanks ?? []}
            page={page}
            perPage={itemsPerPage}
            columns={columns}
            totalCount={0}
            onPageChange={handlePageChange}
            emptyStateText="We couldn't find any bank account in the system."
          />
        </RenderIf>
        <RenderIf condition={isFetching}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
      <CreateBankModal isOpen={toggleModals.openCreateBankModal} close={toggleCreateBank} />
      <DeleteBankModal isOpen={toggleModals.openDeleteBankModal} close={toggleDeleteBank} bank={toggleModals.activeBank} />
    </motion.div>
  )
}