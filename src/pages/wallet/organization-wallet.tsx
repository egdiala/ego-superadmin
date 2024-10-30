import React, { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { formattedNumber, pascalCaseToWords } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useSearchParams } from "react-router-dom";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useGetWalletTransactions } from "@/services/hooks/queries";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { FetchedWalletTransaction, FetchedWalletTransactionCount, WalletStatus } from "@/types/wallet";
import { PurchaseModel } from "@/types/organizations";

export const OrganizationWalletPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status">("count")
    const { data: count, isFetching: fetchingCount } = useGetWalletTransactions({ component, wallet_type: "organization-wallet" })
    const { data: transactions, isFetching } = useGetWalletTransactions({ page: page.toString(), item_per_page: itemsPerPage.toString(), wallet_type: "organization-wallet" })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className="flex items-center gap-2.5">
                        <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                            <span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.updatedAt, "p")}
                        </div>
                    </div>
                )
            }
        },
        {
            header: () => "Type",
            accessorKey: "status",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className={cn("text-sm capitalize whitespace-nowrap", item?.status === -1 ? "text-semantics-error" : "text-semantics-success")}>
                        { item?.status === -1 ? "Debit" : "Credit" }
                    </div>
                )
            }
        },
        {
            header: () => "Description",
            accessorKey: "description",
        },
        {
            header: () => "Business Name",
            accessorKey: "business_name",
        },
        {
            header: () => "Model",
            accessorKey: "purchase_model",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className="text-sm capitalize text-grey-dark-2 whitespace-nowrap">
                        {pascalCaseToWords(PurchaseModel[item?.purchase_model])}
                    </div>
                )
            }
        },
        {
            header: () => "Mode",
            accessorKey: "payment_method",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedWalletTransaction
                return (
                    <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">
                        {item?.payment_method === "others" ? "wallet" : item?.payment_method}
                    </div>
                )
            }
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
                    <div className={cn("flex items-center gap-2.5 text-sm font-medium capitalize whitespace-nowrap", item?.status === 1 ? "text-dark-green-1" : "text-semantics-error")}>
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
            { label: "Value", value: formattedNumber((count as FetchedWalletTransactionCount)?.total_amount), color: "bg-[#F8F9FB]" },
            { label: "Count", value: (count as FetchedWalletTransactionCount)?.total ?? 0, color: "bg-green-4" },
        ]
    },[count])
  
    return (
        <Fragment>
            <RenderIf condition={!isFetching && !fetchingCount}>
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
                    <Table
                        columns={columns}
                        data={(transactions as FetchedWalletTransaction[]) ?? []}
                        page={page}
                        perPage={itemsPerPage}
                        totalCount={(count as FetchedWalletTransactionCount)?.total}
                        onPageChange={handlePageChange}
                        emptyStateText="No wallet transaction found."
                    />
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching || fetchingCount}>
            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}