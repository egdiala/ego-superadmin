import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { BarChart, TableAction } from "@/components/core";

interface VehiclesHomeProps {
    [x: string]: any
}

export const Vehicles: React.FC<VehiclesHomeProps> = ({ className }) => {
    const referrals = [
        { label: "total", amount: "54,936" },
        { label: "assigned", amount: "4,936" },
        { label: "unassigned", amount: "234" },
        { label: "active", amount: "35" },
    ]
    const data = [
        {
            "label": "Unassigned",
            "total": 4,
            "totalColor": "hsla(206, 10%, 55%, 1)",
        },
        {
            "label": "Assigned",
            "confirmed": 13,
            "confirmedColor": "hsla(113, 43%, 50%, 1)",
        },
        {
            "label": "Active",
            "pending": 2,
            "pendingColor": "hsla(206, 10%, 55%, 1)",
        },
    ]
    return (
        <div className={cn("flex flex-col p-6 gap-[1.625rem] h-full rounded-lg bg-white", className)}>
            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-grey-dark-1 text-xl font-semibold">Vehicles</h4>
                    <TableAction theme="ghost">
                        <Icon icon="mdi:funnel" className="size-4" />
                        Status
                    </TableAction>
                </div>
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
                    "confirmed",
                    "pending",
                ]}
                colors={data.map((item) => item.totalColor ?? item?.confirmedColor ?? item?.pendingColor) as string[]}
                indexBy="label"
                margin={{ top: 25, right: 20, bottom: 25, left: 20 }}
                padding={0.85}
                valueScale={{ type: "linear" }}
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
                legends={[]}
                role="application"
                data={data}
            />
        </div>
    )
}