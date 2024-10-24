import React from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Button, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";
import { useGetPayouts } from "@/services/hooks/queries";

export const DisbursementOverviewPage: React.FC = () => {
    useGetPayouts({ component: "count-status", start_date: "2024-01-01", end_date: "2024-10-10" })
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
                    <Button theme="primary" block>
                        <Icon icon="lucide:send" className="size-4" />
                        Make a Payout
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-4 border border-input-filled p-4 rounded-lg">
                <h1 className="font-semibold text-base text-grey-dark-1">Disbursed so far</h1>
            </div>
            <div className="flex items-center gap-4 border border-input-filled p-4 rounded-lg">
                <h1 className="font-semibold text-base text-grey-dark-1">Available to be disbursed</h1>
            </div>
        </motion.div>
    )
}