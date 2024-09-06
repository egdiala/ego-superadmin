import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { TableAction } from "@/components/core";

interface CustomerBatteryDetailsProps {
    [key: PropertyKey]: any
}

export const CustomerBatteryDetails: React.FC<CustomerBatteryDetailsProps> = ({ className }) => {
    const models1 = [
        { label: "Total energy consumed", value: "0kw" },
        { label: "Av. energy consumption", value: "0kw" },
        { label: "Average kwh per kilometer", value: "0kwh" },
    ]
    const models2 = [
        { label: "CO2 emissions saved ", value: "0kt" },
        { label: "Total emissions avoided", value: "0kt" },
    ]
    return (
        <div className={cn("flex flex-col h-fit gap-6 p-4 rounded-lg border border-[#E1E4E6]", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-2 text-xs">State of charge</h4>
                    <span className="text-grey-dark-1 text-xl">0%</span>
                </div>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Filter
                </TableAction>
            </div>
            <div className="grid gap-1">
                <h4 className="font-semibold text-base text-grey-dark-1">Battery health</h4>
                <div className="relative flex-1 h-fit rounded-lg bg-green-4 px-3 py-4">
                    <span className="text-2xl text-grey-dark-1">0%</span>
                    <motion.div className="absolute inset-0 rounded-l-lg py-4 overflow-hidden" initial={{ width: 0 }} whileInView={{ width: "0.0%" }} transition={{ ease: "linear", duration: 0.8 }} style={{ background: "linear-gradient(90.01deg, #136207 0.01%, #55B648 106.72%)"}}>
                        <span className="text-2xl text-white ml-3">0%</span>
                    </motion.div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-between">
            {
                [...models1, ...models2].map((item, idx) =>
                <div key={idx} className="grid gap-1">
                    <h4 className="text-grey-dark-2 text-xs text-left">{item.label}</h4>
                    <span className="text-grey-dark-1 font-medium text-base text-left">{item.value}</span>
                </div>
                )
            }
            </div>
        </div>
    )
}