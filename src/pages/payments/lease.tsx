import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetLeasePayments } from "@/services/hooks/queries";
import { useLocation, useSearchParams } from "react-router-dom";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import type { FetchedLeasePayment, FetchedReceivableCount, PaymentCountStatus } from "@/types/payment";

export const LeasePaymentLogPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingPaymentsCount } = useGetLeasePayments<FetchedReceivableCount>({ request_type: "2", status: "1", component: "count" })
    const { data: countStatus, isFetching: fetchingPaymentsCountStatus } = useGetLeasePayments<PaymentCountStatus>({ request_type: "2", status: "1", component: "count-status" })
    const { data: payments, isFetching: fetchingPayments } = useGetLeasePayments<FetchedLeasePayment[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), request_type: "2", status: "1" })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "created",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedLeasePayment
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span> • 11:59 pm</div>
                )
            }
        },
        {
            header: () => "Business Name",
            accessorKey: "user_orgs.name",
        },
        {
            header: () => "Amount",
            accessorKey: "total_remitted",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedLeasePayment
                return (
                    <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.total_remitted)}</div>
                )
            }
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: () => {
                return (
                    <div className="text-sm text-semantics-success whitespace-nowrap">Successful</div>
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
    
    const trips = useMemo(() => {
        return [
            { label: "Amount", value: formattedNumber(countStatus?.total_amount ?? 0), color: "bg-[#F8F9FB]" },
            { label: "Count", value: countStatus?.total_count ?? 0, color: "bg-green-4" },
        ]
    },[countStatus?.total_amount, countStatus?.total_count])
  
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {
                    trips.map((item) =>
                        <div key={item.label} className={cn("relative grid overflow-hidden content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                            <Icon icon="mdi:naira" className="absolute size-20 -left-4 self-center text-grey-dark-3 text-opacity-10" />
                            <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                            <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search name" />
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
            <RenderIf condition={!fetchingPayments && !fetchingPaymentsCount && !fetchingPaymentsCountStatus}>
                <Table
                    data={payments ?? []}
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={count?.total}
                    onPageChange={handlePageChange}
                />
            </RenderIf>
            <RenderIf condition={fetchingPayments || fetchingPaymentsCount || fetchingPaymentsCountStatus}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}