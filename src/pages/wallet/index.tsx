import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { cn } from "@/libs/cn";
import { useLocation, useSearchParams } from "react-router-dom";
import { useGetWalletStats, useGetWalletTransactions } from "@/services/hooks/queries";
import { FetchedWalletTransaction, FetchedWalletTransactionCount, WalletStatus } from "@/types/wallet";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Loader } from "@/components/core/Button/Loader";
import { format, formatRelative } from "date-fns";
import { formattedNumber } from "@/utils/textFormatter";

export const WalletPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status">("count")
    const { isFetching: fetchingStats } = useGetWalletStats({ user_type: "organization" })
    const { data: count, isFetching: fetchingCount } = useGetWalletTransactions({ component, wallet_type: "organization-wallet" })
    const { data: transactions, isFetching } = useGetWalletTransactions({ wallet_type: "organization-wallet" })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className="flex items-center gap-2.5">
                        <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                            <span className="capitalize">{formatRelative(item?.updatedAt, new Date()).split("at")[0]}</span> • {format(item?.updatedAt, "p")}
                        </div>
                    </div>
                )
            }
        },
        {
            header: () => "Transaction ID",
            accessorKey: "transaction_id",
        },
        {
            header: () => "Description",
            accessorKey: "description",
        },
        {
            header: () => "Business/Staff Name",
            accessorKey: "business_name",
        },
        {
            header: () => "Type",
            accessorKey: "transaction_type",
        },
        {
            header: () => "Model",
            accessorKey: "payment_method",
        },
        {
            header: () => "Amount",
            accessorKey: "amount",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className="flex items-center gap-2.5">
                        {formattedNumber(item?.amount)}
                    </div>
                )
            }
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className="flex items-center gap-2.5">
                        {WalletStatus[item?.status]}
                    </div>
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
            { label: "Wallet balance", value: formattedNumber((count as FetchedWalletTransactionCount)?.balance || 0), color: "bg-[#F8F9FB]" },
            { label: "Count", value: (count as FetchedWalletTransactionCount)?.total, color: "bg-green-4" },
        ]
    },[])
  
    return (
        <Fragment>
            <RenderIf condition={!isFetching && !fetchingCount && !fetchingStats}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Wallet</h1>
                    <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                            <div className="w-full md:w-1/3 xl:w-1/4">
                                <SearchInput placeholder="Search name, reference etc" />
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
                        <Table
                            columns={columns}
                            data={(transactions as FetchedWalletTransaction[]) ?? []}
                            page={page}
                            perPage={itemsPerPage}
                            totalCount={(count as FetchedWalletTransactionCount)?.total}
                            onPageChange={handlePageChange}
                            emptyStateText="You have not made any transaction."
                        />
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching || fetchingCount || fetchingStats}>
            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}