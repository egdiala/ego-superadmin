import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FetchedPayout } from "@/types/payment";
import { Loader } from "@/components/core/Button/Loader";
import { useGetPayouts } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useSearchParams } from "react-router-dom";
import { RenderIf, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { format } from "date-fns";
import { formattedNumber } from "@/utils/textFormatter";
import { useApprovePayout } from "@/services/hooks/mutations";

export const DisbursementLogPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [msg, setMsg] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: payouts, isFetching } = useGetPayouts<FetchedPayout[]>({ page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { data: payoutCount, isFetching: isFetchingCount } = useGetPayouts<any>({ component: "count", page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { mutate, isPending } = useApprovePayout(msg, () => setMsg(""))
    
    const approvePayout = (payout_id: string, status?: "1" | "2") => {
      setMsg("Approved Successfully!")
      mutate({ payout_id, status })
    }
    
    const processPayout = (payout_id: string, status?: "1" | "2") => {
      setMsg("Reinitiated Successfully!")
      mutate({ payout_id, status })
    }
  

    const columns = [
      {
        header: () => "Date & Time",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Month Paid",
        accessorKey: "start_date",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.start_date, "MMMM")}</span></div>
          )
        }
      },
      {
        header: () => "Stakeholder",
        accessorKey: "stakeholder_name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.stakeholder_name}</div>
          )
        }
      },
      {
        header: () => "Amount Due",
        accessorKey: "actual_amount",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.actual_amount)}</div>
          )
        }
      },
      {
        header: () => "Amount Paid",
        accessorKey: "amount",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.amount)}</div>
          )
        }
      },
      {
        header: () => "Bank Name",
        accessorKey: "account_data.bank_name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.account_data?.bank_name}</div>
          )
        }
      },
      {
        header: () => "Account Number",
        accessorKey: "account_data.account_number",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.account_data?.account_number}</div>
          )
        }
      },
      {
        header: () => "Approval",
        accessorKey: "approve_status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <Fragment>
              <RenderIf condition={item?.approve_status === 0}>
                <div className="text-sm text-semantics-amber whitespace-nowrap">Pending</div>
              </RenderIf>
              <RenderIf condition={item?.approve_status === 1}>
                <div className="text-sm text-green-1 whitespace-nowrap">Approved</div>
              </RenderIf>
            </Fragment>
          )
        }
      },
      {
        header: () => "Payment Status",
        accessorKey: "status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <Fragment>
              <RenderIf condition={(item?.status === 0) && (item?.approve_status === 0)}>
                <div className="text-sm text-semantics-amber whitespace-nowrap">Pending</div>
              </RenderIf>
              <RenderIf condition={(item?.status === 3) && (item?.approve_status === 0)}>
                <div className="text-sm text-semantics-amber whitespace-nowrap">Processing</div>
              </RenderIf>
              <RenderIf condition={(item?.status === 1)}>
                <div className="text-sm text-green-1 whitespace-nowrap">Paid</div>
              </RenderIf>
              <RenderIf condition={(item?.status === 2)}>
                <div className="text-sm text-semantics-error whitespace-nowrap">Failed</div>
              </RenderIf>
            </Fragment>
          )
        }
      },
      {
        header: () => "Actions",
        accessorKey: "actions",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedPayout
          return (
            <Fragment>
              <RenderIf condition={item?.approve_status === 0}>
                <button type="button" disabled={isPending} onClick={() => approvePayout(item?.payout_id, "1")} className="flex items-center py-1 px-2 justify-center text-sm text-grey-dark-1 bg-grey-dark-4 rounded-md whitespace-nowrap">Approve</button>
              </RenderIf>
              <RenderIf condition={item?.status === 2}>
                <button type="button" disabled={isPending} onClick={() => processPayout(item?.payout_id, "2")} className="flex items-center py-1 px-2 justify-center text-sm text-grey-dark-1 bg-grey-dark-4 rounded-md whitespace-nowrap">Reinitiate</button>
              </RenderIf>
            </Fragment>
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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-6">
            <div className="flex items-center justify-end gap-2 flex-wrap">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <TableAction type="button" theme="ghost" block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                    <TableAction theme="secondary" block>
                        <Icon icon="mdi:funnel" className="size-4" />
                        Filter
                    </TableAction>
                </div>
            </div>
            <RenderIf condition={!isFetching && !isFetchingCount}>
              <Table
                  columns={columns}
                  data={payouts ?? []}
                  page={page}
                  perPage={itemsPerPage}
                  totalCount={payoutCount?.total}
                  onPageChange={handlePageChange}
                  emptyStateText="We couldn't find any disbursement in the logs."
              />
            </RenderIf>
            <RenderIf condition={isFetching || isFetchingCount}>
              <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}