import React from "react";
import { cn } from "@/libs/cn";
import { ProgressCircle, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";

interface TripDetailsDashboardProps {
    [key: PropertyKey]: any
}

export const TripDetails: React.FC<TripDetailsDashboardProps> = ({ className }) => {
    const models1 = [
        { label: "Total trip duration", value: "0hrs : 0mins" },
        { label: "Av. trip distance", value: "0km" },
        { label: "Av. daily mileage", value: "0mil" },
    ]
    const models2 = [
        { label: "Av.  trip duration", value: "0hrs : 0mins" },
        { label: "", value: "" },
        { label: "Av. idle time", value: "0hrs : 0mins" },
    ]
    return (
        <div className={cn("flex flex-col gap-6 px-4 pt-4 pb-7 rounded-lg bg-white", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-2 text-xs">Total kilometres covered</h4>
                    <span className="text-grey-dark-1 text-xl">0km</span>
                </div>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Filter
                </TableAction>
            </div>
            <div className="grid gap-6 max-w-2xl w-full mx-auto">
                <ProgressCircle radius={200} value={1} className="mx-auto">
                    <div className="grid text-center">
                        <h4 className="text-[5rem] font-light text-grey-dark-1">0</h4>
                        <p className="text-sm text-grey-dark-3">MPH</p>
                        <p className="text-sm text-grey-dark-3">Av. Speed</p>
                    </div>
                </ProgressCircle>
                <div className="flex justify-between py-2 w-full">
                    <div className="flex flex-col text-center bg-portal-bg py-2 px-8 gap-1 rounded-lg">
                        <h4 className="text-grey-dark-3 text-sm">Vehicles In Motion</h4>
                        <span className="text-grey-dark-1 font-medium text-lg">0</span>
                    </div>
                    <div className="flex flex-col text-center bg-portal-bg py-2 px-8 gap-1 rounded-lg">
                        <h4 className="text-grey-dark-3 text-sm">Vehicles Idle Vehicles</h4>
                        <span className="text-grey-dark-1 font-medium text-lg">0</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-between">
            {
                [...models1, ...models2].map((item, idx) =>
                <div key={idx} className="grid gap-1">
                    <h4 className="text-grey-dark-2 text-xs text-left">{item.label}</h4>
                    <span className="text-grey-dark-1 text-lg text-left">{item.value}</span>
                </div>
                )
            }
            </div>
            <div className="grid gap-1">
                <span className="text-grey-dark-3 text-xs">Most frequented destination</span>
                <p className="text-grey-dark-1 text-sm">-</p>
            </div>
            <div className="grid gap-1">
                <span className="text-grey-dark-3 text-xs">Most frequent reason for commute</span>
                <p className="text-grey-dark-1 text-sm">-</p>
            </div>
        </div>
    )
}