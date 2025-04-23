import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, RenderIf, Table } from "@/components/core";
import { FetchedCommuteRevenueOrg, FetchedReceivableCount } from "@/types/payment";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetCommutePayments, useGetOrganization } from "@/services/hooks/queries";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";


export const ViewStaffCommuteReceivablesTripsPage: React.FC = () => {
    const location = useLocation();
    const { id, orgId } = useParams()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: organization, isFetching: fetchingOrg } = useGetOrganization(orgId as string)
    const { data: count, isFetching: fetchingReceivablesCount } = useGetCommutePayments<FetchedReceivableCount>({ organization_id: orgId, start_date: id, end_date: id, status: "2", component: "count", request_type: "3" })
    const { data: receivables, isFetching: fetchingReceivables } = useGetCommutePayments<FetchedCommuteRevenueOrg[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), organization_id: orgId, start_date: id, end_date: id, status: "2", request_type: "3" })

    const columns = [
        // {
        //     header: () => "Charge Date & Time",
        //     accessorKey: "createdAt",
        //     cell: ({ row }: { row: any; }) => {
        //         const item = row?.original as FetchedCommuteRevenueOrg
        //         return (
        //             <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.charge_at, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
        //         )
        //     }
        // },
        {
            header: () => "Trip Date & Time",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedCommuteRevenueOrg
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
        // {
        //     header: () => "Pickup",
        //     accessorKey: "ride_data.start_address",
        // },
        {
            header: () => "Trip Amount",
            accessorKey: "total_amount",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedCommuteRevenueOrg
                return (
                    <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{formattedNumber(item?.total_amount)}</div>
                )
            }
        },
        {
            header: () => "Paid By",
            accessorKey: "ride_data.payment_type",
            cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedCommuteRevenueOrg
            return (
                <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.payment_type === 1 ? "Business" : "Rider"}</div>
            )
            }
        },
        // {
        //     header: () => "Mode",
        //     accessorKey: "ride_data.charge_data.method",
        //     cell: ({ row }: { row: any; }) => {
        //         const item = row?.original as FetchedCommuteRevenueOrg
        //         return (
        //             <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.charge_data?.method}</div>
        //         )
        //     }
        // },
        // {
        //     header: () => "Status",
        //     accessorKey: "ride_data.charge_data.status",
        //     cell: ({ row }: { row: any; }) => {
        //         const item = row?.original as FetchedCommuteRevenueOrg
        //         return (
        //             <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap", item?.charge_status === 0 && "text-semantics-amber", item?.charge_status === 1 && "text-semantics-success")}>
        //                 <RenderIf condition={item?.charge_status === 0}>
        //                     Pending
        //                 </RenderIf>
        //                 <RenderIf condition={item?.charge_status === 1}>
        //                     Paid
        //                 </RenderIf>
        //             </div>
        //         )
        //     }
        // }
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
            <Breadcrumb items={[{ label: "Expected Revenue", link: "/revenue/lease" }, { label: "Lease", link: "/revenue/lease" }, { label: `${formatRelative(id as string, new Date()).split(" at ").at(0)} • 11:59 PM invoices`, link: `/revenue/lease/${id}` }, { label: organization?.name!, link: `/revenue/lease/${id}/${orgId}` }]} showBack />
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <h1 className="font-bold text-xl text-grey-dark-1">{organization?.name}</h1>
                <RenderIf condition={!fetchingReceivables && !fetchingReceivablesCount && !fetchingOrg}>
                    <Table
                        data={receivables ?? []}
                        page={page}
                        columns={columns}
                        perPage={itemsPerPage}
                        totalCount={count?.total}
                        onPageChange={handlePageChange}
                    />
                </RenderIf>
                <RenderIf condition={fetchingReceivables || fetchingReceivablesCount || fetchingOrg}>
                    <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}