import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useGetLeasePayments } from "@/services/hooks/queries";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { FetchedLeaseVehiclePayment, FetchedReceivableCount } from "@/types/payment";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { Loader } from "@/components/core/Button/Loader";
import { format } from "date-fns";
import { formattedNumber } from "@/utils/textFormatter";

export const VehiclePaymentPage: React.FC = () => {
    const params = useParams()
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingRevenuesCount } = useGetLeasePayments<FetchedReceivableCount>({ request_type: "3", vehicle_id: params?.id, component: "count" })
    const { data: revenue, isFetching: fetchingRevenues } = useGetLeasePayments<FetchedLeaseVehiclePayment[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), request_type: "3", vehicle_id: params?.id })
    const columns = [
      {
        header: () => "Reg. Date",
        accessorKey: "created",
        cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedLeaseVehiclePayment
            return (
                <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.created, "dd MMM, yyyy")}</span> • 11:59 pm</div>
            )
        }
      },
      {
        header: () => "Organization",
        accessorKey: "user_orgs.name",
      },
      {
        header: () => "Total Distance (km)",
        accessorKey: "total_km",
        cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedLeaseVehiclePayment
            return (
                <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">{item?.total_km.toLocaleString("en-US")} Km</div>
            )
        }
      },
      {
        header: () => "Amount",
        accessorKey: "total_expected",
        cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedLeaseVehiclePayment
            return (
                <div className="text-sm text-grey-dark-2 whitespace-nowrap">{formattedNumber(item?.total_expected)}</div>
            )
        }
      },
      {
        header: () => "Status",
        accessorKey: "status",
        cell: ({ row }: { row: any; }) => {
            const item = row?.original as FetchedLeaseVehiclePayment
            return (
                <Fragment>
                    <RenderIf condition={item?.status === 1}>
                        <div className="text-sm text-semantics-success whitespace-nowrap">Remitted</div>
                    </RenderIf>
                    <RenderIf condition={item?.status === 0}>
                        <div className="text-sm text-semantics-error whitespace-nowrap">Not Remitted</div>
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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
            <div className="w-full md:w-1/3 xl:w-1/4">
                <SearchInput placeholder="Search name, ref etc" />
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
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
          <RenderIf condition={!fetchingRevenues && !fetchingRevenuesCount}>
            <Table
              data={revenue ?? []}
              page={page}
              columns={columns}
              perPage={itemsPerPage}
              totalCount={count?.total}
              onPageChange={handlePageChange}
              emptyStateText="No payment has been made from this vehicle"
            />
          </RenderIf>
          <RenderIf condition={fetchingRevenues || fetchingRevenuesCount}>
            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
          </RenderIf>
        </motion.div>
    )
}
