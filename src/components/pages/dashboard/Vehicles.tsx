import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { BarChart } from "@/components/core";
import type { FetchedVehicleCountStatus } from "@/types/vehicles";

interface VehiclesHomeProps {
    data: FetchedVehicleCountStatus
    [key: PropertyKey]: any
}

export const Vehicles: React.FC<VehiclesHomeProps> = ({ className, data }) => {
    const referrals = useMemo(() => {
        return [
            { label: "total", amount: data?.total },
            { label: "assigned", amount: data?.driver_assigned },
            { label: "unassigned", amount: data?.total - data?.driver_assigned },
            { label: "active", amount: data?.active_count },
        ]
    },[data?.active_count, data?.driver_assigned, data?.total])
    const items = useMemo(() => {
        return [
            {
                "label": "Unassigned",
                "unassigned": data?.total - data?.driver_assigned,
                "unassignedColor": "hsla(206, 10%, 55%, 1)",
            },
            {
                "label": "Assigned",
                "assigned": data?.driver_assigned,
                "assignedColor": "hsla(113, 43%, 50%, 1)",
            },
            {
                "label": "Active",
                "active": data?.active_count,
                "activeColor": "hsla(206, 10%, 55%, 1)",
            },
        ]
    },[data?.active_count, data?.driver_assigned, data?.total])
    return (
        <div className={cn("flex flex-col p-6 gap-[1.625rem] h-full rounded-lg bg-white", className)}>
            <div className="grid gap-2">
                <h4 className="text-grey-dark-1 text-xl font-semibold">Vehicles</h4>
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
                    "unassigned",
                    "assigned",
                    "active",
                ]}
                colors={items.map((item) => item.unassignedColor ?? item?.assignedColor ?? item?.activeColor) as string[]}
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
                data={items}
            />
        </div>
    )
}