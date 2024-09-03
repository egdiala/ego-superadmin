import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { BarChart } from "@/components/core";
import { FetchedServiceRequestsCountStatus } from "@/types/service-requests";

interface ServiceRequestsHomeProps {
    data: FetchedServiceRequestsCountStatus
    [key: PropertyKey]: any
}

export const ServiceRequests: React.FC<ServiceRequestsHomeProps> = ({ className, data }) => {
    const referrals = useMemo(() => {
        return [
            { label: "Total Req.", amount: data?.total },
            { label: "Pending", amount: data?.total_pending },
            { label: "Cancelled", amount: data?.total_rejected },
            { label: "Completed", amount: data?.total_complete },
        ]
    },[data?.total, data?.total_complete, data?.total_pending, data?.total_rejected])
    const items = [
        {
            "label": "Total",
            "total": data?.total,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": data?.total_complete,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": data?.total_pending,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": data?.total_rejected,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Completed",
            "total": data?.total,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": data?.total_complete,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": data?.total_pending,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": data?.total_rejected,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Pending",
            "total": data?.total,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": data?.total_complete,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": data?.total_pending,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": data?.total_rejected,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Cancelled",
            "total": data?.total,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": data?.total_complete,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": data?.total_pending,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
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
                valueScale={{ type: "linear" }}
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
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: "middle",
                    legendOffset: 40,
                    truncateTickAt: 0
                }}
                enableLabel={false}
                labelSkipWidth={7}
                labelSkipHeight={12}
                labelTextColor="hsla(206, 10%, 55%, 1)"
                legends={[]}
                role="application"
                ariaLabel="Service Requests Chart"
                data={items}
            />
        </div>
    )
}