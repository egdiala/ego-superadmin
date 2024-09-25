import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetLeasePayments } from "@/services/hooks/queries";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import type { FetchedLeaseReceivable, FetchedReceivableCount } from "@/types/payment";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const LeaseReceivablesPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingReceivablesCount } = useGetLeasePayments<FetchedReceivableCount>({ request_type: "1", status: "0", component: "count" })
    const { data: receivables, isFetching: fetchingReceivables } = useGetLeasePayments<FetchedLeaseReceivable[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), request_type: "1", status: "0" })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "created",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span> • 11:59 pm</div>
                )
            }
        },
        {
            header: () => "Total Number of business owing",
            accessorKey: "total_org",
        },
        {
            header: () => "Total amount being owed",
            accessorKey: "total_expected",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.total_expected)}</div>
                )
            }
        },
        {
            header: () => "Action",
            accessorKey: "action",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedLeaseReceivable
                return (
                    <Link className="text-dark-green-1 font-medium text-sm underline underline-offset-2" to={`/receivables/lease/${item?.created}`}>View</Link>
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
                    emptyStateText="We couldn't find any receivable for Lease Model"
                />
            </RenderIf>
            <RenderIf condition={fetchingReceivables || fetchingReceivablesCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}