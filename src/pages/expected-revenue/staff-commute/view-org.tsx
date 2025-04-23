import React, { useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import { useGetCommutePayments } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Breadcrumb, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { formattedNumber } from "@/utils/textFormatter";
import { ExportButton } from "@/components/shared/export-button";
import { FetchedCommuteRevenueOrg, FetchedReceivableCount } from "@/types/payment";


export const StaffCommuteExpectedRevenueOrgPage: React.FC = () => {
    const location = useLocation();
    const { id, orgId } = useParams()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "export">("count")
    const { data: count, isFetching: fetchingReceivablesCount } = useGetCommutePayments<FetchedReceivableCount>({ organization_id: orgId, start_date: id, end_date: id, charge_status: "1", component, request_type: "3" })
    const { data: receivables, isFetching: fetchingReceivables } = useGetCommutePayments<FetchedCommuteRevenueOrg>({ page: page.toString(), item_per_page: itemsPerPage.toString(), organization_id: orgId, start_date: id, end_date: id, charge_status: "1", request_type: "3" })

    const columns = [
        // {
        //     header: () => "Charge Date & Time",
        //     accessorKey: "createdAt",
        //     cell: ({ row }: { row: any; }) => {
        //         const item = row?.original as FetchedCommuteRevenueOrg
        //         return (
        //             <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.charge_at, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
        //         )
        //     }
        // },
        {
            header: () => "Trip Date & Time",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedCommuteRevenueOrg
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
                )
            }
        },
        {
            header: () => "Trip Ref.",
            accessorKey: "trip_ref",
        },
        {
            header: () => "Vehicle Plate",
            accessorKey: "driver_data.plate_number"
        },
        // {
        //     header: () => "Pickup",
        //     accessorKey: "ride_data.start_address",
        // },
        {
            header: () => "Trip Amount",
            accessorKey: "total_amount",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedCommuteRevenueOrg
                return (
                    <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{formattedNumber(item?.total_amount)}</div>
                )
            }
        },
        {
            header: () => "Paid By",
            accessorKey: "ride_data.payment_type",
            cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedCommuteRevenueOrg
            return (
                <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.payment_type === 1 ? "Business" : "Rider"}</div>
            )
            }
        },
        // {
        //     header: () => "Mode",
        //     accessorKey: "ride_data.charge_data.method",
        //     cell: ({ row }: { row: any; }) => {
        //         const item = row?.original as FetchedCommuteRevenueOrg
        //         return (
        //             <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.charge_data?.method}</div>
        //         )
        //     }
        // },
        {
            header: () => "Status",
            accessorKey: "ride_data.charge_data.status",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedCommuteRevenueOrg
                return (
                    <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap", item?.charge_status === 0 && "text-semantics-amber", item?.charge_status === 1 && "text-semantics-success")}>
                        <RenderIf condition={item?.charge_status === 0}>
                            Pending
                        </RenderIf>
                        <RenderIf condition={item?.charge_status === 1}>
                            Paid
                        </RenderIf>
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
    }, [location])

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <Breadcrumb items={[{ label: "Expected Revenue", link: "/revenue/staff-commute" }, { label: "Staff Commute", link: "/revenue/staff-commute" }, { label: `${formatRelative(id as string, new Date()).split(" at ").at(0)} • 11:59 PM invoices`, link: `/revenue/staff-commute/${id}` }, { label: (receivables as unknown as FetchedCommuteRevenueOrg[])?.at(0)?.organization_name!, link: `/revenue/staff-commute/${id}/${orgId}` }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <h1 className="font-bold text-xl text-grey-dark-1">{(receivables as unknown as FetchedCommuteRevenueOrg[])?.at(0)?.organization_name!}</h1>
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search reference" />
                    </div>
                
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <ExportButton
                            onExport={() => setComponent("export")} 
                            onExported={() => {
                                if (!fetchingReceivablesCount && component === "export") {
                                    setComponent("count")
                                }
                            }} 
                            isLoading={fetchingReceivablesCount}
                        />
                        <TableAction type="button" theme="secondary" block>
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                    </div>
                </div>
                <RenderIf condition={!fetchingReceivables && !fetchingReceivablesCount}>
                    <Table
                        data={(receivables as unknown as FetchedCommuteRevenueOrg[]) ?? []}
                        page={page}
                        columns={columns}
                        perPage={itemsPerPage}
                        totalCount={(count as any)?.total}
                        onPageChange={handlePageChange}
                    />
                </RenderIf>
                <RenderIf condition={fetchingReceivables || fetchingReceivablesCount}>
                    <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}