import React, { useEffect, useState } from "react";
import { format, formatRelative } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetCommutePayments } from "@/services/hooks/queries";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { FetchedReceivableCount, SingleCommuteReceivable } from "@/types/payment";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Breadcrumb, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { ExportButton } from "@/components/shared/export-button";


export const ViewStaffCommuteExpectedRevenuePage: React.FC = () => {
    const location = useLocation();
    const { id } = useParams()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "export">("count")
    const { data: count, isFetching: fetchingReceivablesCount } = useGetCommutePayments<FetchedReceivableCount>({ request_type: "2", start_date: id, end_date: id, component })
    const { data: receivables, isFetching: fetchingReceivables } = useGetCommutePayments<SingleCommuteReceivable[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), request_type: "2", start_date: id, end_date: id })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "created",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleCommuteReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span> • 11:59 pm</div>
                )
            }
        },
        {
            header: () => "Plate Number",
            accessorKey: "vehicle_data.plate_number",
        },
        {
            header: () => "Total Trips",
            accessorKey: "total_trip"
        },
        {
            header: () => "Expected Revenue",
            accessorKey: "total_expected",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleCommuteReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.total_expected)}</div>
                )
            }
        },
        {
            header: () => "Amount Paid (Remitted)",
            accessorKey: "total_remitted",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleCommuteReceivable
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.total_remitted)}</div>
                )
            }
        },
        {
            header: () => "Action",
            accessorKey: "action",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleCommuteReceivable
                return (
                    <Link className="text-dark-green-1 font-medium text-sm underline underline-offset-2" to={`/revenue/staff-commute/${item?.created}/${item?.vehicle_data?._id}`}>View</Link>
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
            <Breadcrumb items={[{ label: "Expected Revenue", link: "/revenue/staff-commute" }, { label: "Staff Commute", link: "/revenue/staff-commute" }, { label: `${formatRelative(id as string, new Date()).split(" at ").at(0)} • 11:59 PM invoices`, link: `/revenue/staff-commute/${id}` }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search reference" />
                    </div>
                
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                                                                                  <ExportButton
                                                                                                    onExport={() => setComponent("export")} 
                                                                                                    onExported={() => {
                                                                                                      if (!fetchingReceivablesCount && component === "export") {
                                                                                                        setComponent("count")
                                                                                                      }
                                                                                                    }} 
                                                                                                    isLoading={fetchingReceivablesCount}
                                                                                                  />
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