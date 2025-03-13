import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { BarChart, RenderIf, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";
import { useGetPayouts } from "@/services/hooks/queries";
import type { PayoutStats } from "@/types/payment";
import { Loader } from "@/components/core/Button/Loader";
import { formattedNumber } from "@/utils/textFormatter";
import { cn } from "@/libs/cn";
import { useReactToPrint } from "react-to-print";

export const DisbursementOverviewPage: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ content: () => contentRef.current });
    const { data, isFetching } = useGetPayouts<PayoutStats>({ component: "count-status", start_date: "2024-10-01", end_date: "2024-10-31" })

    const disbursed = useMemo(() => {
        const total = (data?.total_asset_co_paid || 0) + (data?.total_tax_paid || 0) + (data?.total_tech_paid || 0)
        return [
            { label: "Total payout disbursed", value: formattedNumber(total), className: "bg-[#F8F9FB]" },
            { label: "To daily tax", value: formattedNumber(data?.total_tax_paid || 0), className: "bg-green-4" },
            { label: "To tech co.", value: formattedNumber(data?.total_tech_paid || 0), className: "bg-yellow-4" },
            { label: "To asset co.", value: formattedNumber(data?.total_asset_co_paid || 0), className: "bg-light-red" },
        ]
    },[data?.total_asset_co_paid, data?.total_tax_paid, data?.total_tech_paid])

    const available = useMemo(() => {
        const total = (data?.total_asset_co_pending || 0) + (data?.total_tax_pending || 0) + (data?.total_tech_pending || 0)
        return [
            { label: "Total", value: formattedNumber(total), className: "bg-[#F8F9FB]" },
            { label: "To daily tax", value: formattedNumber(data?.total_tax_pending || 0), className: "bg-green-4" },
            { label: "To tech co.", value: formattedNumber(data?.total_tech_pending || 0), className: "bg-yellow-4" },
            { label: "To asset co.", value: formattedNumber(data?.total_asset_co_pending || 0), className: "bg-light-red" },
        ]
    }, [data?.total_asset_co_pending, data?.total_tax_pending, data?.total_tech_pending])

    const items = useMemo(() => {
        return [
            {
                "label": "Daily Tax",
                "total": (data?.total_tax_paid || 0) + (data?.total_tax_pending || 0),
                "totalColor": "hsla(205, 92%, 10%, 1)",
                "completed": (data?.total_tax_paid || 0),
                "completedColor": "hsla(113, 43%, 50%, 1)",
                "pending": (data?.total_tax_pending || 0),
                "pendingColor": "hsla(41, 100%, 44%, 1)",
            },
            {
                "label": "Tech co",
                "total": (data?.total_tech_paid || 0) + (data?.total_tech_pending || 0),
                "totalColor": "hsla(205, 92%, 10%, 1)",
                "completed": (data?.total_tech_paid || 0),
                "completedColor": "hsla(113, 43%, 50%, 1)",
                "pending": (data?.total_tech_pending || 0),
                "pendingColor": "hsla(41, 100%, 44%, 1)",
            },
            {
                "label": "Asset Co",
                "total": (data?.total_asset_co_paid || 0) + (data?.total_asset_co_pending || 0),
                "totalColor": "hsla(205, 92%, 10%, 1)",
                "completed": (data?.total_asset_co_paid || 0),
                "completedColor": "hsla(113, 43%, 50%, 1)",
                "pending": (data?.total_asset_co_pending || 0),
                "pendingColor": "hsla(41, 100%, 44%, 1)",
            },
        ]
    },[data?.total_asset_co_paid, data?.total_asset_co_pending, data?.total_tax_paid, data?.total_tax_pending, data?.total_tech_paid, data?.total_tech_pending])
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-6">
            <div className="flex items-center justify-end gap-2 flex-wrap">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <TableAction type="button" theme="ghost" onClick={handlePrint} block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                </div>
            </div>
            <RenderIf condition={!isFetching}>
                <div ref={contentRef} className="flex flex-col gap-6">
                    <div className="grid gap-4 border border-green-3 p-4 rounded-lg">
                        <h1 className="font-semibold text-base text-grey-dark-1">Disbursed so far</h1>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {
                                disbursed?.map((item) =>
                                    <div key={item.label} className={cn("relative overflow-hidden grid gap-1 content-center justify-items-center py-5 rounded-lg", item?.className)}>
                                        <Icon icon="mdi:naira" className="absolute size-20 -left-6 self-center text-grey-dark-3 text-opacity-10" />
                                        <span className="text-sm text-grey-dark-2">{item?.label}</span>
                                        <h4 className="text-grey-dark-1 text-3xl">{item?.value}</h4>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="grid gap-4 border border-green-3 p-4 rounded-lg">
                        <h1 className="font-semibold text-base text-grey-dark-1">Available to be disbursed</h1>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {
                                available?.map((item, idx) =>
                                    <div key={idx} className={cn("relative overflow-hidden grid gap-1 content-center justify-items-center py-5 rounded-lg", item?.className)}>
                                        <Icon icon="mdi:naira" className="absolute size-20 -left-6 self-center text-grey-dark-3 text-opacity-10" />
                                        <span className="text-sm text-grey-dark-2">{item?.label}</span>
                                        <h4 className="text-grey-dark-1 text-3xl">{item?.value}</h4>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="grid gap-4 border border-green-3 py-4 px-5 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-base text-grey-dark-1">Payout</h1>

                        </div>
                            <BarChart
                                className="w-full h-80 flex justify-center"
                                keys={[
                                    "total",
                                    "completed",
                                    "pending",
                                    "cancelled"
                                ]}
                                indexBy="label"
                                colors={["hsla(205, 92%, 10%, 1)", "hsla(113, 43%, 50%, 1)", "hsla(41, 100%, 44%, 1)", "hsla(4, 80%, 48%, 1)"]}
                                margin={{ top: 25, right: 20, bottom: 25, left: 20 }}
                                padding={0.7}
                                innerPadding={2}
                                valueScale={{ type: "linear", min: 0 }}
                                indexScale={{ type: "band", round: true }}
                                groupMode="grouped"
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 0,
                                    tickRotation: 0,
                                    legendOffset: 32,
                                    truncateTickAt: 0
                                }}
                                axisLeft={{
                                    tickValues: 3,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legendPosition: "middle",
                                    legendOffset: 40,
                                    truncateTickAt: 0
                                }}
                                enableGridY={true}
                                gridYValues={5} // Ensure grid lines match whole numbers
                                enableLabel={false}
                                labelSkipWidth={7}
                                labelSkipHeight={12}
                                labelTextColor="hsla(206, 10%, 55%, 1)"
                                legends={[]}
                                role="application"
                                ariaLabel="Payouts Chart"
                                data={items}
                            />
                    </div>
                </div>
            </RenderIf>
            <RenderIf condition={isFetching}>
              <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}