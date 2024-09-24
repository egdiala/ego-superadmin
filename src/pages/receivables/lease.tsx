import React, { useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedLeaseReceivable } from "@/types/payment";
import { useGetLeasePayments } from "@/services/hooks/queries";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { formattedNumber } from "@/utils/textFormatter";

export const LeaseReceivablesPage: React.FC = () => {
    const itemsPerPage = 10;
    const [page] = useState(1);
    const { data: receivables, isFetching: fetchingReceivables } = useGetLeasePayments<FetchedLeaseReceivable[]>({ request_type: "1", status: "0" })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "created",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedLeaseReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span></div>
                )
            }
        },
        {
            header: () => "Total Number of business owing",
            accessorKey: "total_invoice",
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
            cell: () => {
                return (
                    <button type="button" className="text-dark-green-1 font-medium text-sm underline underline-offset-2">View</button>
                )
            }
        },
    ];

    const handlePageChange = () => {
      // in a real page, this function would paginate the data from the backend
      
    };
  
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
            <RenderIf condition={!fetchingReceivables}>
                <Table
                    data={receivables ?? []}
                    page={page}
                    columns={columns}
                    perPage={itemsPerPage}
                    totalCount={[].length}
                    onPageChange={handlePageChange}
                />
            </RenderIf>
            <RenderIf condition={fetchingReceivables}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}