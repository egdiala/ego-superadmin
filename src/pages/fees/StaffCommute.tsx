import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useGetFees } from "@/services/hooks/queries"
import type { FetchedRevenueSplit } from "@/types/fees"
import { formattedNumber } from "@/utils/textFormatter"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { RenderIf, Table, TableAction } from "@/components/core"
import { AddNewParameter, DeleteParameter, EditParameter } from "@/components/pages/revenue-split"
import { useLocation, useSearchParams } from "react-router-dom"
import { hasPermission, RenderFeature } from "@/hooks/usePermissions"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"
import { ExportButton } from "@/components/shared/export-button"

export const FeesStaffCommutePage: React.FC = () => {
    const itemsPerPage = 10;
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"fee_variables" | "export">("" as any)
    const { data: staffFees, isFetching } = useGetFees<FetchedRevenueSplit[]>({ screen_name: "staff_commute_fee", component })

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
        (hasPermission("SETUP_FEE_FEE", "update") || hasPermission("SETUP_FEE_FEE", "delete")) && {
            header: () => "Actions",
            accessorKey: "actions",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedRevenueSplit
                return (
                    <div className="flex items-center gap-6">
                        <RenderFeature module="SETUP_FEE_FEE" permission="update">
                            <button
                                type="button"
                                className="rounded bg-grey-dark-4 py-1 px-2 text-grey-dark-1 text-sm"
                                onClick={() => toggleEditParameter(item)}
                            >
                                Edit
                            </button>
                        </RenderFeature>
                        <RenderFeature module="SETUP_FEE_FEE" permission="delete">
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
                <ExportButton 
                    onExport={() => setComponent("export")} 
                    onExported={() => {
                        if (!isFetching && component === "export") {
                            setComponent("" as any)
                        }
                    }} 
                    isLoading={isFetching} 
                />
                <RenderFeature module="SETUP_FEE_FEE" permission="create">
                    <TableAction theme="primary" block onClick={toggleNewParameter}>
                        <Icon icon="lucide:plus" className="size-4" />
                        Add New Parameter
                    </TableAction>
                </RenderFeature>
            </div>
            <RenderIf condition={!isFetching}>
                <Table
                    data={staffFees ?? []}
                    page={page}
                    columns={columns.filter((column) => !!column)}
                    perPage={itemsPerPage}
                    totalCount={staffFees?.length}
                    onPageChange={handlePageChange}
                />
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
            <RenderFeature module="SETUP_FEE_FEE" permission="create">
                <AddNewParameter isOpen={toggleModals.openAddNewParameterModal} close={toggleNewParameter} msg="Staff commute fee created successfully!" screenName="staff_commute_fee" />
            </RenderFeature>
            <RenderFeature module="SETUP_FEE_FEE" permission="update">
                <EditParameter isOpen={toggleModals.openEditParameterModal} close={() => toggleEditParameter(null)} parameter={toggleModals.activeItem as FetchedRevenueSplit} />
            </RenderFeature>
            <RenderFeature module="SETUP_FEE_FEE" permission="delete">
                <DeleteParameter isOpen={toggleModals.openDeleteParameterModal} close={() => toggleDeleteParameter(null)} parameter={toggleModals.activeItem as FetchedRevenueSplit} />
            </RenderFeature>
        </motion.div>
    )
}