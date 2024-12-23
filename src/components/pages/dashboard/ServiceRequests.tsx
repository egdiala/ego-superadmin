import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { BarChart, EmptyState, RenderIf } from "@/components/core";
import { FetchedServiceRequestsCountStatus } from "@/types/service-requests";

interface ServiceRequestsHomeProps {
    data: FetchedServiceRequestsCountStatus
    [key: PropertyKey]: any
}

export const ServiceRequests: React.FC<ServiceRequestsHomeProps> = ({ className, data }) => {
    const referrals = useMemo(() => {
        return [
            { label: "Total Req.", amount: data?.total || 0 },
            { label: "Pending", amount: data?.total_pending || 0 },
            { label: "Cancelled", amount: data?.total_rejected || 0 },
            { label: "Completed", amount: data?.total_complete || 0 },
        ]
    },[data?.total, data?.total_complete, data?.total_pending, data?.total_rejected])
    const items = [
        {
            "label": "Total",
            "total": data?.total,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            // "completed": data?.total_complete,
            // "completedColor": "hsla(113, 43%, 50%, 1)",
            // "pending": data?.total_pending,
            // "pendingColor": "hsla(41, 100%, 44%, 1)",
            // "cancelled": data?.total_rejected,
            // "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Completed",
            // "total": data?.total,
            // "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": data?.total_complete,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            // "pending": data?.total_pending,
            // "pendingColor": "hsla(41, 100%, 44%, 1)",
            // "cancelled": data?.total_rejected,
            // "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Pending",
            // "total": data?.total,
            // "totalColor": "hsla(205, 92%, 10%, 1)",
            // "completed": data?.total_complete,
            // "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": data?.total_pending,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            // "cancelled": data?.total_rejected,
            // "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Cancelled",
            // "total": data?.total,
            // "totalColor": "hsla(205, 92%, 10%, 1)",
            // "completed": data?.total_complete,
            // "completedColor": "hsla(113, 43%, 50%, 1)",
            // "pending": data?.total_pending,
            // "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": data?.total_rejected,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
    ]
    return (
        <div className={cn("flex flex-col p-6 gap-[1.625rem] h-full rounded-lg bg-white", className)}>
            <div className="grid gap-2">
                <h4 className="text-grey-dark-1 text-xl font-semibold">Service Requests</h4>
                <div className="p-4 flex items-center justify-between gap-1 bg-portal-bg rounded-lg w-full">
                {
                    referrals.map((referral) =>
                    <div key={referral.label} className="grid gap-1">
                        <h4 className="capitalize text-grey-dark-2 text-xs">{referral.label}</h4>
                        <span className="text-grey-dark-1 text-base">{referral.amount}</span>
                    </div>
                    )
                }
                </div>
            </div>
            <RenderIf condition={data?.total > 0}>
                <BarChart
                    className="w-full h-80 flex justify-center"
                    keys={[
                        "total",
                        "completed",
                        "pending",
                        "cancelled"
                    ]}
                    colors={items.map((item) => item.totalColor ?? item?.completedColor ?? item?.pendingColor ?? item?.cancelledColor) as string[]}
                    indexBy="label"
                    margin={{ top: 25, right: 20, bottom: 25, left: 20 }}
                    padding={0.85}
                    valueScale={{ type: "linear", min: 0 }}
                    indexScale={{ type: "band", round: true }}
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
                    ariaLabel="Service Requests Chart"
                    data={items}
                />
            </RenderIf>
            <RenderIf condition={data?.total == 0}>
                <EmptyState emptyStateText="No service request has been made" />
            </RenderIf>
        </div>
    )
}