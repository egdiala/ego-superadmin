import React from "react";
import { cn } from "@/libs/cn";
import { BarChart } from "@/components/core";

interface ServiceRequestsHomeProps {
    [x: string]: any
}

export const ServiceRequests: React.FC<ServiceRequestsHomeProps> = ({ className }) => {
    const referrals = [
        { label: "Total Req.", amount: "4,936" },
        { label: "Pending", amount: "35" },
        { label: "Cancelled", amount: "234" },
        { label: "Completed", amount: "4,936" },
    ]
    const data = [
        {
            "label": "Total",
            "total": 8,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": 14,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": 5,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": 1,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Completed",
            "total": 8,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": 14,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": 5,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": 1,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Pending",
            "total": 8,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": 14,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": 5,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": 1,
            "cancelledColor": "hsla(4, 80%, 48%, 1)",
        },
        {
            "label": "Cancelled",
            "total": 8,
            "totalColor": "hsla(205, 92%, 10%, 1)",
            "completed": 14,
            "completedColor": "hsla(113, 43%, 50%, 1)",
            "pending": 5,
            "pendingColor": "hsla(41, 100%, 44%, 1)",
            "cancelled": 1,
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
                    <div className="grid gap-1">
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
                data={data}
            />
        </div>
    )
}