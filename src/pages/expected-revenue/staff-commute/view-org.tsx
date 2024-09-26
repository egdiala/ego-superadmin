import React, { useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import type { FetchedTripType } from "@/types/trips";
import { useGetTrips } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Breadcrumb, RenderIf, SearchInput, Table, TableAction } from "@/components/core";


export const StaffCommuteExpectedRevenueOrgPage: React.FC = () => {
    const location = useLocation();
    const { id, orgId } = useParams()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingReceivablesCount } = useGetTrips({ vehicle_id: orgId, start_date: id, end_date: id, charge_status: "1", component: "count" })
    const { data: receivables, isFetching: fetchingReceivables } = useGetTrips({ page: page.toString(), item_per_page: itemsPerPage.toString(), vehicle_id: orgId, start_date: id, end_date: id, charge_status: "1", })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedTripType
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
                )
            }
        },
        {
            header: () => "Trip Ref.",
            accessorKey: "trip_ref",
        },
        {
            header: () => "Vehicle Plate",
            accessorKey: "driver_data.plate_number"
        },
        {
            header: () => "Pickup",
            accessorKey: "ride_data.start_address",
        },
        {
            header: () => "Drop off",
            accessorKey: "ride_data.end_address",
        },
        {
            header: () => "Payment Method",
            accessorKey: "ride_data.charge_data.method",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedTripType
                return (
                    <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.charge_data?.method}</div>
                )
            }
        },
        {
            header: () => "Payment Status",
            accessorKey: "ride_data.charge_data.status",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedTripType
                return (
                    <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap", item?.ride_data?.charge_data?.status === "pending" && "text-semantics-amber", item?.ride_data?.charge_data?.status === "yes" && "text-semantics-success")}>
                        <RenderIf condition={item?.ride_data?.charge_data?.status === "pending"}>
                            {item?.ride_data?.charge_data?.status}
                        </RenderIf>
                        <RenderIf condition={item?.ride_data?.charge_data?.status === "yes"}>
                            Successful
                        </RenderIf>
                    </div>
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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <Breadcrumb items={[{ label: "Expected Revenue", link: "/revenue/staff-commute" }, { label: "Staff Commute", link: "/revenue/staff-commute" }, { label: `${formatRelative(id as string, new Date()).split(" at ").at(0)} • 11:59 PM invoices`, link: `/revenue/staff-commute/${id}` }, { label: (receivables as FetchedTripType[])?.at(0)?.driver_data?.plate_number!, link: `/revenue/staff-commute/${id}/${orgId}` }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <h1 className="font-bold text-xl text-grey-dark-1">{(receivables as FetchedTripType[])?.at(0)?.driver_data?.plate_number!}</h1>
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
                        data={(receivables as FetchedTripType[]) ?? []}
                        page={page}
                        columns={columns}
                        perPage={itemsPerPage}
                        totalCount={(count as any)?.total}
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