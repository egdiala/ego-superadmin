import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useGetFees } from "@/services/hooks/queries"
import { RenderIf, Table, TableAction } from "@/components/core"
import { pageVariants } from "@/constants/animateVariants"
import { AddNewParameter, DeleteParameter, EditParameter } from "@/components/pages/revenue-split"
import { Loader } from "@/components/core/Button/Loader"
import type { FetchedRevenueSplit } from "@/types/fees"
import { formattedNumber } from "@/utils/textFormatter"
import { hasPermission, RenderFeature } from "@/hooks/usePermissions"
import { useLocation, useSearchParams } from "react-router-dom"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"

export const RevenueSplitStaffCommutePage: React.FC = () => {
    const itemsPerPage = 10;
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: staffCommuteRevenue, isFetching } = useGetFees<FetchedRevenueSplit[]>({ screen_name: "staff_revenue_split" })
    
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
        (hasPermission("SETUP_REV_SPLIT", "update") || hasPermission("SETUP_REV_SPLIT", "delete")) && {
            header: () => "Actions",
            accessorKey: "actions",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedRevenueSplit
                return (
                    <div className="flex items-center gap-6">
                        <RenderFeature module="SETUP_REV_SPLIT" permission="update">
                            <button
                                type="button"
                                className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm"
                                onClick={() => toggleEditParameter(item)}
                            >
                                Edit
                            </button>
                        </RenderFeature>
                        <RenderFeature module="SETUP_REV_SPLIT" permission="delete">
                            <button
                                type="button"
                                className="text-semantics-error bg-semantics-error/10 rounded py-1 px-2  text-sm"
                                onClick={() => toggleDeleteParameter(item)}
                            >
                                Delete
                            </button>
                        </RenderFeature>
                    </div>
                )
            }
        },
    ];

    const handlePageChange = () => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };
        
    useEffect(() => {
        getPaginationParams(location, setPage, () => {})
    }, [location])
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-4 w-full sm:w-fit md:ml-auto">
                <TableAction theme="ghost" block>
                    <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                    Export
                </TableAction>
                <RenderFeature module="SETUP_REV_SPLIT" permission="create">
                    <TableAction theme="primary" block onClick={toggleNewParameter}>
                        <Icon icon="lucide:plus" className="size-4" />
                        Add New Parameter
                    </TableAction>
                </RenderFeature>
            </div>
            <RenderIf condition={!isFetching}>
                <Table
                    data={staffCommuteRevenue ?? []}
                    page={page}
                    columns={columns.filter((column) => !!column)}
                    perPage={itemsPerPage}
                    totalCount={staffCommuteRevenue?.length}
                    onPageChange={handlePageChange}
                />
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
            <RenderFeature module="SETUP_REV_SPLIT" permission="create">
                <AddNewParameter isOpen={toggleModals.openAddNewParameterModal} close={toggleNewParameter} msg="Staff revenue split created successfully!" screenName="staff_revenue_split" />
            </RenderFeature>
            <RenderFeature module="SETUP_REV_SPLIT" permission="update">
                <EditParameter isOpen={toggleModals.openEditParameterModal} close={() => toggleEditParameter(null)} parameter={toggleModals.activeItem as FetchedRevenueSplit} />
            </RenderFeature>
            <RenderFeature module="SETUP_REV_SPLIT" permission="create">
                <DeleteParameter isOpen={toggleModals.openDeleteParameterModal} close={() => toggleDeleteParameter(null)} parameter={toggleModals.activeItem as FetchedRevenueSplit} />
            </RenderFeature>
        </motion.div>
    )
}