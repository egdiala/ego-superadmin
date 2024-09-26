import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, RenderIf, Table } from "@/components/core";
import { FetchedReceivableCount, SingleLeaseOrg } from "@/types/payment";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetLeasePayments, useGetOrganization } from "@/services/hooks/queries";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";


export const LeaseExpectedRevenueOrgPage: React.FC = () => {
    const location = useLocation();
    const { id, orgId } = useParams()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: organization, isFetching: fetchingOrg } = useGetOrganization(orgId as string)
    const { data: count, isFetching: fetchingReceivablesCount } = useGetLeasePayments<FetchedReceivableCount>({ request_type: "3", start_date: id, end_date: id, organization_id: orgId, component: "count" })
    const { data: receivables, isFetching: fetchingReceivables } = useGetLeasePayments<SingleLeaseOrg[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), request_type: "3", start_date: id, end_date: id, organization_id: orgId })

    const columns = [
        {
            header: () => "Date & Time",
            accessorKey: "created",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseOrg
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span> • 11:59 pm</div>
                )
            }
        },
        {
            header: () => "Plate Number",
            accessorKey: "plate_number",
        },
        {
            header: () => "Daily Service Obligation",
            accessorKey: "total_obligation",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseOrg
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.total_obligation)}</div>
                )
            }
        },
        {
            header: () => "Additional Km (if any)",
            accessorKey: "excess_km",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseOrg
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{item?.excess_km.toLocaleString("en-US")} Km</div>
                )
            }
        },
        {
            header: () => "Total Amount due",
            accessorKey: "total_expected",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as SingleLeaseOrg
                return (
                    <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{formattedNumber(item?.total_expected)}</div>
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