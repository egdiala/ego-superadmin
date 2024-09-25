import React, { useEffect, useState } from "react";
import { format, formatRelative } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetLeasePayments } from "@/services/hooks/queries";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { FetchedReceivableCount, SingleLeaseReceivable } from "@/types/payment";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Breadcrumb, RenderIf, SearchInput, Table, TableAction } from "@/components/core";


export const ViewLeaseExpectedRevenuePage: React.FC = () => {
    const location = useLocation();
    const { id } = useParams()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingReceivablesCount } = useGetLeasePayments<FetchedReceivableCount>({ request_type: "2", start_date: id, end_date: id, component: "count" })
    const { data: receivables, isFetching: fetchingReceivables } = useGetLeasePayments<SingleLeaseReceivable[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), request_type: "2", start_date: id, end_date: id })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "created",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span> • 11:59 pm</div>
                )
            }
        },
        {
            header: () => "Business name",
            accessorKey: "user_orgs.name",
        },
        {
            header: () => "Total Km Covered",
            accessorKey: "total_km",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{item?.total_km.toLocaleString("en-US")} Km</div>
                )
            }
        },
        {
            header: () => "Additional Km (if any)",
            accessorKey: "excess_km",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{item?.excess_km.toLocaleString("en-US")} Km</div>
                )
            }
        },
        {
            header: () => "Expected Revenue",
            accessorKey: "total_expected",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.total_expected)}</div>
                )
            }
        },
        {
            header: () => "Remitted Revenue",
            accessorKey: "total_remitted",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.total_remitted)}</div>
                )
            }
        },
        {
            header: () => "Action",
            accessorKey: "action",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseReceivable
                return (
                    <Link className="text-dark-green-1 font-medium text-sm underline underline-offset-2" to={`/revenue/lease/${item?.created}/${item?.user_orgs?.auth_id}`}>View</Link>
                )
            }
        },
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
            <Breadcrumb items={[{ label: "Expected Revenue", link: "/revenue/lease" }, { label: "Lease", link: "/revenue/lease" }, { label: `${formatRelative(id as string, new Date()).split(" at ").at(0)} • 11:59 PM invoices`, link: `/revenue/lease/${id}` }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search reference" />
                    </div>
                
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction type="button" theme="ghost" block>
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                        <TableAction type="button" theme="secondary" block>
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                    </div>
                </div>
                <RenderIf condition={!fetchingReceivables && !fetchingReceivablesCount}>
                    <Table
                        data={receivables ?? []}
                        page={page}
                        columns={columns}
                        perPage={itemsPerPage}
                        totalCount={count?.total}
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