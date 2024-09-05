import React, { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetWalletStats, useGetWalletTransactions } from "@/services/hooks/queries";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { formattedNumber } from "@/utils/textFormatter";
import { FetchedWalletTransaction, FetchedWalletTransactionCount, FetchedWalletTransactionCountStatus } from "@/types/wallet";
import { pageVariants } from "@/constants/animateVariants";
import { motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";

export const CustomerWalletPage: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component] = useState<"count" | "count-status">("count")
    const { data, isFetching: fetchingStats } = useGetWalletStats({ user_type: "organization", auth_id: params?.id as string })
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetWalletTransactions({ component: "balance", wallet_type: "organization-wallet", auth_id: params?.id as string })
    const { data: count, isFetching: fetchingCount } = useGetWalletTransactions({ component, wallet_type: "organization-wallet", auth_id: params?.id as string })
    const { data: transactions, isFetching } = useGetWalletTransactions({ wallet_type: "organization-wallet", auth_id: params?.id as string })

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Transaction type",
        accessorKey: "phone_number",
      },
      {
        header: () => "Description",
        accessorKey: "first_name",
      },
      {
        header: () => "Amount",
        accessorKey: "lastName",
      },
      {
        header: () => "Status",
        accessorKey: "status",
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
          { label: "Wallet balance", value: formattedNumber((countStatus as FetchedWalletTransactionCountStatus)?.balance ?? 0), color: "bg-[#F8F9FB]" },
          { label: "Inflow", value: formattedNumber(data?.credit_amount! ?? 0), color: "bg-[#F6FBF6]" },
          { label: "Outflow", value: formattedNumber(data?.debit_amount! ?? 0), color: "bg-[#FDF2F2]" },
      ]
    }, [countStatus, data?.credit_amount, data?.debit_amount])
    
    return (
      <Fragment>
        <RenderIf condition={!isFetching && !fetchingCount && !fetchingCountStatus && !fetchingStats}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {
                      trips.map((item) =>
                      <div key={item.label} className={cn("relative grid overflow-hidden content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                        <Icon icon="mdi:naira" className="absolute size-20 -left-6 self-center text-grey-dark-3 text-opacity-10" />
                        <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                        <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                      </div>
                      )
                  }
              </div>
              <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between pt-4">
                  <div className="w-full md:w-1/3 xl:w-1/4">
                      <SearchInput placeholder="Search description" />
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
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
          </motion.div>
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount || fetchingCountStatus || fetchingStats}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}