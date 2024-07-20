import React from "react";
import { cn } from "@/libs/cn";

interface CustomersDashboardProps {
    [x: string]: any
}

export const Customers: React.FC<CustomersDashboardProps> = ({ className }) => {
    const models = [
        { label: "Lease Model", value: "630,936" },
        { label: "Staff Plan Model", value: "660,936" },
        { label: "E-hailing Model", value: "60,936" },
    ]
    return (
        <div className={cn("flex flex-col gap-5 px-4 pt-4 pb-7 rounded-lg bg-white bg-[url('@/assets/building.svg')] bg-no-repeat bg-right-bottom", className)}>
            <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                <h4 className="text-grey-dark-2 text-sm">Total Customers</h4>
                <span className="text-grey-dark-1 font-semibold text-xl">54,936</span>
            </div>
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-1">
            {
                models.map((item) =>
                <div key={item.label} className="grid gap-1 w-fit">
                    <h4 className="text-grey-dark-2 text-xs">{item.label}</h4>
                    <span className="text-grey-dark-1 text-lg">{item.value}</span>
                </div>
                )
            }
            </div>
        </div>
    )
}