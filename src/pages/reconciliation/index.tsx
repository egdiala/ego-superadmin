import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetReconciliation } from "@/services/hooks/queries";
import { useLocation, useSearchParams } from "react-router-dom";
import { RenderIf, Table } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { endOfMonth, format, parse, startOfMonth, startOfToday } from "date-fns";
import { FetchedReconciliation, FetchReconciliationTotals } from "@/types/payment";
import { formattedNumber } from "@/utils/textFormatter";
import { ReconciliationsFilter } from "@/components/pages/reconciliation/ReconciliationsFilter";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ExportButton } from "@/components/shared/export-button";

const PopoverInfo: React.FC<{ text: string; }> = ({ text }) => {
    return (
        <Popover as={Fragment}>
            <PopoverButton className="block focus:outline-none data-[active]:text-grey-dark-1 data-[hover]:text-grey-dark-2 data-[focus]:outline-0 data-[focus]:outline-none">
                <Icon icon="ph:info-fill" className="text-grey-dark-3 size-3.5 -mt-1" />
            </PopoverButton>
            <PopoverPanel
                transition
                anchor="top end" as="section"
                style={{ boxShadow: "0px 7px 20.6px 0px rgba(0, 0, 0, 0.25)" }}
                className="scrollbar-hide bg-grey-dark-1 overflow-visible w-56 py-2 px-3.5 flex flex-col gap-1.5 rounded text-white transition duration-500 ease-in-out data-[closed]:-translate-y-5 -mt-3.5 ml-0.5 data-[closed]:opacity-0"
            >
                <p className="text-sm text-white">{text}</p>
                <div className="size-3 absolute inset-x-0 left-[46.3%] -bottom-1.5 rotate-45 flex items-center justify-center bg-grey-dark-1" />
            </PopoverPanel>
        </Popover>
    )
}

export const ReconciliationPage: React.FC = () => {
    const today = startOfToday();
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        start_date: format(startOfMonth(parse(format(today, "yyyy-MM-dd"), "yyyy-MM-dd", new Date())), "yyyy-MM-dd"),
        end_date: format(endOfMonth(parse(format(today, "yyyy-MM-dd"), "yyyy-MM-dd", new Date())), "yyyy-MM-dd")
    })
    
    const [component, setComponent] = useState<"count-status" | "export">("count-status")
    const { data: reconciliations, isFetching } = useGetReconciliation<FetchedReconciliation[]>({ ...filters })
    const { data: count, isFetching: fetchingCount } = useGetReconciliation<FetchReconciliationTotals>({ component, ...filters })

    const totals = useMemo(() => {
        return [
            { label: "Total Remitted", value: formattedNumber(count?.total_amount as number ?? 0) },
            { label: "Remitted from Lease", value: formattedNumber(count?.total_lease_amount as number ?? 0) },
            { label: "Remitted from Staff Commute", value: formattedNumber(count?.total_commute_amount as number ?? 0) },
        ]
    },[count?.total_amount, count?.total_commute_amount, count?.total_lease_amount])

    const columns = [
        {
          header: () => "Date & Time",
          accessorKey: "createdAt",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
            )
          }
        },
        {
          header: () => <>Total <PopoverInfo text="Total Remitted from Lease + Staff Commute Businesses" /> </>,
          accessorKey: "total",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.rev_data?.total_lease + item?.rev_data?.total_staffcom)}</div>
            )
          }
        },
        {
          header: () => "Lease(Remitted)",
          accessorKey: "rev_data.total_lease",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.rev_data?.total_lease)}</div>
            )
          }
        },
        {
          header: () => "Staff Commute(Remitted)",
          accessorKey: "rev_data.total_staffcom",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.rev_data?.total_staffcom)}</div>
            )
          }
        },
        {
          header: () => <>Daily Tax <PopoverInfo text="% of revenue allocated to Tax" /></>,
          accessorKey: "daily_tax",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.daily_tax)}</div>
            )
          }
        },
        {
          header: () => <>Tech Co <PopoverInfo text="% of revenue allocated to Tech Co." /></>,
          accessorKey: "tech_co",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.tech_co)}</div>
            )
          }
        },
        {
          header: () => <>Asset Co <PopoverInfo text="% of revenue allocated to Asset Co." /></>,
          accessorKey: "asset_co",
          cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedReconciliation
            return (
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.asset_co)}</div>
            )
          }
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, reconciliations?.length!, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location, setPage])
  
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Reconciliation</h1>
            <p className="text-sm text-grey-dark-2 pb-3.5">This is a log of all remitted revenue on the CabZero platform and available for distribution to the business stakeholders.</p>
            <div className="grid content-start gap-5 pt-4 pb-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-end">
                
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <ExportButton
                          onExport={() => setComponent("export")} 
                          onExported={() => {
                              if (!fetchingCount && component === "export") {
                              setComponent("count-status")
                              }
                          }} 
                          isLoading={fetchingCount}
                      />
                      <ReconciliationsFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} theme="secondary" />
                    </div>
                </div>
                <RenderIf condition={!fetchingCount}>
                    <div className="grid gap-4 grid-cols-3">
                        {
                            totals?.map((total) =>
                                <div key={total.label} className="relative overflow-hidden grid gap-1 content-center justify-items-center bg-[#F8F9FB] py-5 rounded-lg">
                                    <Icon icon="mdi:naira" className="absolute size-20 -left-6 self-center text-grey-dark-3 text-opacity-10" />
                                    <span className="text-sm text-grey-dark-2">{total?.label}</span>
                                    <h4 className="text-grey-dark-1 text-3xl">{total?.value}</h4>
                                </div>
                            )
                        }
                    </div>
                </RenderIf>
                <RenderIf condition={!isFetching}>
                  <RenderIf condition={reconciliations !== undefined}>
                    <Table
                        page={page}
                        data={reconciliations ?? []}
                        columns={columns}
                        perPage={reconciliations?.length!}
                        totalCount={reconciliations?.length!}
                        onPageChange={handlePageChange}
                        emptyStateText="We couldn't find any reconciliation in our system."
                    />
                  </RenderIf>
                </RenderIf>
                <RenderIf condition={isFetching || fetchingCount}>
                  <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}