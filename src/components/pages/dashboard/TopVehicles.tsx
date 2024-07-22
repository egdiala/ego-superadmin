import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import whiteCar from "@/assets/white_car.svg";
import { TableAction } from "@/components/core";

interface TopVehiclesDashboardProps {
    [x: string]: any
}

export const TopVehicles: React.FC<TopVehiclesDashboardProps> = ({ className }) => {
    const commuters = [
        "ABC 123 DEF",
        "ABC 123 DEF",
        "ABC 123 DEF",
        "ABC 123 DEF",
        "ABC 123 DEF"
    ]
    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 font-semibold text-xl">Top Vehicles</h1>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    By Trips
                    <Icon icon="ph:caret-down" className="size-4" />
                </TableAction>
            </div>
            <div className="grid gap-5">
                {
                    commuters.map((commuter, id) =>
                    <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-grey-dark-1">{id + 1}.</span>
                            <img src={whiteCar} alt="vehicle" className="object-cover object-center w-8 rounded-full" />
                            <span className="text-sm text-grey-dark-2">{commuter}</span>
                        </div>
                        <span className="text-sm text-grey-dark-1">25</span>
                    </div>
                    )
                }
            </div>
        </div>
    )
}