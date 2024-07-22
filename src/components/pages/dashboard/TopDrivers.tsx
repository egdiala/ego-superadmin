import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { TableAction } from "@/components/core";

interface TopDriversDashboardProps {
    [x: string]: any
}

export const TopDrivers: React.FC<TopDriversDashboardProps> = ({ className }) => {
    const drivers = [
        { name: "Wade Warren", photo: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Floyd Miles", photo: "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Leslie Alexander", photo: "https://images.unsplash.com/photo-1530423470967-45b90dca3a4f?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Brooklyn Simmons", photo: "https://images.unsplash.com/photo-1495307299410-57b5ba03852b?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ]
    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 font-semibold text-xl">Top Drivers</h1>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    By Trips
                    <Icon icon="ph:caret-down" className="size-4" />
                </TableAction>
            </div>
            <div className="grid gap-5">
                {
                    drivers.map((driver, id) =>
                    <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-grey-dark-1">{id + 1}.</span>
                            <img src={driver.photo} alt={driver.name} className="object-cover object-center size-7 rounded-full" />
                            <span className="text-sm text-grey-dark-2">{driver.name}</span>
                        </div>
                        <span className="text-sm text-grey-dark-1">25</span>
                    </div>
                    )
                }
            </div>
        </div>
    )
}