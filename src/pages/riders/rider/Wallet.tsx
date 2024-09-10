import React, { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useGetWalletStats, useGetWalletTransactions } from "@/services/hooks/queries";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import type { FetchedWalletTransaction, FetchedWalletTransactionCount, FetchedWalletTransactionCountStatus } from "@/types/wallet";

export const RiderWalletPage: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status">("count")
    const { data, isFetching: fetchingStats } = useGetWalletStats({ user_type: "rider", auth_id: params?.id as string })
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetWalletTransactions({ component: "balance", wallet_type: "user-wallet", auth_id: params?.id as string })
    const { data: count, isFetching: fetchingCount } = useGetWalletTransactions({ component, wallet_type: "user-wallet", auth_id: params?.id as string })
    const { data: transactions, isFetching } = useGetWalletTransactions({ wallet_type: "user-wallet", auth_id: params?.id as string })

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedWalletTransaction
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Transaction ID",
        accessorKey: "transaction_id",
      },
      {
        header: () => "Transaction type",
        accessorKey: "transaction_type",
      },
      {
        header: () => "Description",
        accessorKey: "description",
      },
      {
        header: () => "Model",
        accessorKey: "payment_method",
      },
      {
        header: () => "Amount",
        accessorKey: "amount",
      },
      {
        header: () => "Status",
        accessorKey: "status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedWalletTransaction
          return (
            <div className={cn("text-sm font-medium capitalize whitespace-nowrap", item?.status === 1 ? "text-dark-green-1" : "text-semantics-error")}>{item?.status === 1 ? "Successful" : "Failed"}</div>
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

  const trips = useMemo(() => {
      return [
          { label: "Wallet balance", value: formattedNumber((countStatus as FetchedWalletTransactionCountStatus)?.balance ?? 0), color: "bg-[#F8F9FB]" },
          { label: "Inflow", value: formattedNumber(data?.credit_amount! ?? 0), color: "bg-green-4" },
          { label: "Outflow", value: formattedNumber(data?.debit_amount! ?? 0), color: "bg-[#FDF2F2]" },
      ]
    },[countStatus, data?.credit_amount, data?.debit_amount])

    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount && !fetchingCountStatus && !fetchingStats}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
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
              <div className="flex flex-col md:flex-row gap-y-3 pt-6 pb-2 md:items-center justify-between">
                  <div className="w-full md:w-1/3 xl:w-1/4">
                      <SearchInput placeholder="Search name, ref etc" />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                      <TableAction theme="ghost" block>
                          <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                          Export
                      </TableAction>
                      <TableAction theme="secondary" block>
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
              />
          </motion.div>
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount || fetchingCountStatus || fetchingStats}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}