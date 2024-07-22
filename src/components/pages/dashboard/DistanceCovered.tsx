import React from "react";
import { cn } from "@/libs/cn";
import { TableAction } from "@/components/core";
import { Icon } from "@iconify/react";

interface DistanceCoveredDashboardProps {
    [x: string]: any
}

export const DistanceCovered: React.FC<DistanceCoveredDashboardProps> = ({ className }) => {
    const models1 = [
        { label: "Av. kilometers ", value: "2,936km" },
        { label: "Av. daily mileage", value: "5,936mil" },
        { label: "CO2 emissions saved", value: "5,936kt" },
    ]
    const models2 = [
        { label: "Total energy consumed", value: "2,936" },
        { label: "Av. energy consumption", value: "5,936" },
        { label: "Av. battery health of vehicles in the fleet", value: "45%" },
    ]
    return (
        <div className={cn("flex flex-col gap-5 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-start justify-between">
                <div className="grid gap-1">
                    <h4 className="text-grey-dark-3 text-sm">Total kilometres covered</h4>
                    <span className="text-grey-dark-1 text-xl">54,936km</span>
                </div>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Filter
                </TableAction>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-between">
            {
                [...models1, ...models2].map((item) =>
                <div key={item.label} className="grid gap-1">
                    <h4 className="text-grey-dark-2 text-xs text-left">{item.label}</h4>
                    <span className="text-grey-dark-1 text-lg text-left">{item.value}</span>
                </div>
                )
            }
            </div>
        </div>
    )
}