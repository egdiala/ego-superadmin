import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { FetchedOrganizationCountStatus } from "@/types/organizations";

interface CustomersDashboardProps {
    data: FetchedOrganizationCountStatus;
    [key: PropertyKey]: any
}

export const Customers: React.FC<CustomersDashboardProps> = ({ data, className }) => {
    const models = useMemo(() => {
        return [
            { label: "Lease Model", value: data?.lease_model },
            { label: "Staff Plan Model", value: data?.staff_model },
            { label: "E-hailing Model", value: data?.ehailing_model },
        ]
    },[data?.ehailing_model, data?.lease_model, data?.staff_model])
    return (
        <div className={cn("flex flex-col gap-5 px-4 pt-4 pb-7 rounded-lg bg-white bg-[url('@/assets/building.svg')] bg-no-repeat bg-right-bottom", className)}>
            <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                <h4 className="text-grey-dark-2 text-sm">Total Customers</h4>
                <span className="text-grey-dark-1 font-semibold text-xl">{data?.total}</span>
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