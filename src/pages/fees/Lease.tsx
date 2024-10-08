import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useGetFees } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { RenderIf, Table, TableAction } from "@/components/core"
import { AddNewParameter, DeleteParameter, EditParameter } from "@/components/pages/revenue-split"
import type { FetchedRevenueSplit } from "@/types/fees"
import { formattedNumber } from "@/utils/textFormatter"

export const FeesLeasePage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1)
    const { data: leaseFees, isFetching } = useGetFees<FetchedRevenueSplit[]>({ screen_name: "lease_model_fee" })
    
    const [toggleModals, setToggleModals] = useState({
        openAddNewParameterModal: false,
        openDeleteParameterModal: false,
        openEditParameterModal: false,
        activeItem: null as FetchedRevenueSplit | null
    })

    const toggleNewParameter = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openAddNewParameterModal: !toggleModals.openAddNewParameterModal,
        }))
    }, [toggleModals.openAddNewParameterModal])

    const toggleEditParameter = useCallback((item: FetchedRevenueSplit | null) => {
        setToggleModals((prev) => ({
            ...prev,
            activeItem: item,
            openEditParameterModal: !toggleModals.openEditParameterModal,
        }))
    }, [toggleModals.openEditParameterModal])

    const toggleDeleteParameter = useCallback((item: FetchedRevenueSplit | null) => {
        setToggleModals((prev) => ({
            ...prev,
            activeItem: item,
            openDeleteParameterModal: !toggleModals.openDeleteParameterModal,
        }))
    }, [toggleModals.openDeleteParameterModal])

    const columns = [
        {
            header: () => "Parameter",
            accessorKey: "name",
        },
        {
            header: () => "Value",
            accessorKey: "amount",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedRevenueSplit
                return (
                    <div className="flex items-center gap-6">
                        { item?.amount_type === "fixed" ? formattedNumber(item?.amount) : `${item?.amount}%` }
                    </div>
                )
            }
        },
        {
            header: () => "Actions",
            accessorKey: "actions",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedRevenueSplit
                return (
                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm"
                            onClick={() => toggleEditParameter(item)}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="text-semantics-error bg-semantics-error/10 rounded py-1 px-2  text-sm"
                            onClick={() => toggleDeleteParameter(item)}
                        >
                            Delete
                        </button>
                    </div>
                )
            }
        },
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend
      
    };
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-4 w-full sm:w-fit md:ml-auto">
                <TableAction theme="ghost" block>
                    <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                    Export
                </TableAction>
                <TableAction theme="primary" block onClick={toggleNewParameter}>
                    <Icon icon="lucide:plus" className="size-4" />
                    Add New Parameter
                </TableAction>
            </div>
            <RenderIf condition={!isFetching}>
                <Table
                    data={leaseFees ?? []}
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={leaseFees?.length}
                    onPageChange={handlePageChange}
                />
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
            <AddNewParameter isOpen={toggleModals.openAddNewParameterModal} close={toggleNewParameter} msg="Lease fee created successfully!" screenName="lease_model_fee" />
            <EditParameter isOpen={toggleModals.openEditParameterModal} close={() => toggleEditParameter(null)} parameter={toggleModals.activeItem as FetchedRevenueSplit} />
            <DeleteParameter isOpen={toggleModals.openDeleteParameterModal} close={() => toggleDeleteParameter(null)} parameter={toggleModals.activeItem as FetchedRevenueSplit} />
        </motion.div>
    )
}