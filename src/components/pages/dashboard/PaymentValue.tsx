import React from "react";
import { cn } from "@/libs/cn";

interface PaymentValueDashboardProps {
    [x: string]: any
}

export const PaymentValue: React.FC<PaymentValueDashboardProps> = ({ className }) => {
    const models = [
        { label: "Lease Model", value: "₦5,630,936 (24)" },
        { label: "Staff Plan Model", value: "₦6,660,936 (10)" },
        { label: "E-hailing Model", value: "₦6,660,936 (10)" },
    ]
    const totals = [
        { label: "Total value of payments", value: "₦54,936" },
        { label: "Volume of payments", value: "34" },
    ]
    return (
        <div className={cn("grid gap-4", className)}>
            <div className="flex flex-col gap-5 p-4 rounded-lg bg-[#55B64821]/[0.13]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    totals.map((item) =>
                    <div key={item.label} className="grid gap-1 w-fit">
                        <h4 className="text-grey-dark-2 text-xs">{item.label} received</h4>
                        <span className="text-grey-dark-1 text-xl font-semibold">{item.value}</span>
                    </div>
                    )
                }
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className={cn("flex flex-col gap-5 p-4 rounded-lg bg-light-red")}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    totals.map((item) =>
                    <div key={item.label} className="grid gap-1 w-fit">
                        <h4 className="text-grey-dark-2 text-xs">{item.label} due</h4>
                        <span className="text-grey-dark-1 text-xl font-semibold">{item.value}</span>
                    </div>
                    )
                }
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
    )
}