import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetPayouts } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { Button, Table, TableAction } from "@/components/core";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { MakePayoutModal } from "@/components/pages/disbursement/MakePayoutModal";

export const DisbursementLogPage: React.FC = () => {
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    useGetPayouts({ component: "count", page: page.toString(), item_per_page: itemsPerPage.toString() })
    const [toggleModals, setToggleModals] = useState({
        openMakePayoutModal: false,
    })
    
    const toggleMakePayout = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openMakePayoutModal: !toggleModals.openMakePayoutModal,
        }))
    },[toggleModals.openMakePayoutModal])

    const columns = [
      {
        header: () => "Date & Time",
        accessorKey: "createdAt",
      },
      {
        header: () => "Month Paid",
        accessorKey: "trip_id",
      },
      {
        header: () => "Stakeholder",
        accessorKey: "sender_auth_id",
      },
      {
        header: () => "Amount Due",
        accessorKey: "rating",
      },
      {
        header: () => "Amount Paid",
        accessorKey: "comment",
      },
      {
        header: () => "Bank Name",
        accessorKey: "comment",
      },
      {
        header: () => "Account Number",
        accessorKey: "comment",
      },
      {
        header: () => "Approval",
        accessorKey: "comment",
      },
      {
        header: () => "Payment Status",
        accessorKey: "comment",
      },
      {
        header: () => "Actions",
        accessorKey: "comment",
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
                <div className="w-full sm:w-auto">
                    <Button type="button" theme="primary" block onClick={toggleMakePayout}>
                        <Icon icon="lucide:send" className="size-4" />
                        Make a Payout
                    </Button>
                </div>
            </div>
            <Table
                columns={columns}
                data={[]}
                page={page}
                perPage={itemsPerPage}
                totalCount={0}
                onPageChange={handlePageChange}
                emptyStateText="We couldn't find any disbursement in the logs."
            />
            <MakePayoutModal isOpen={toggleModals.openMakePayoutModal} close={toggleMakePayout} />
        </motion.div>
    )
}