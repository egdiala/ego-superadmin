import React from "react";
import { cn } from "@/libs/cn";
import { TableAction } from "@/components/core";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface VehicleBatteryHealthDashboardProps {
    [key: PropertyKey]: any
}

export const VehicleBatteryHealth: React.FC<VehicleBatteryHealthDashboardProps> = ({ className }) => {
    const models1 = [
        { label: "Total energy consumed", value: "2,936kw" },
        { label: "Av. energy consumption", value: "5,936kw" },
        { label: "Average kwh per kilometer", value: "5,936kwh" },
    ]
    const models2 = [
        { label: "CO2 emissions saved ", value: "5,936kt" },
        { label: "Total emissions avoided", value: "5,936kt" },
    ]
    return (
        <div className={cn("flex flex-col h-fit gap-6 p-4 rounded-lg border border-grey-dark-4", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-2 text-xs">Battery Health</h4>
                    <span className="text-grey-dark-1 text-xl">0%</span>
                </div>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Filter
                </TableAction>
            </div>
            <div className="grid gap-1">
                <h4 className="font-semibold text-base text-grey-dark-1">State of Charge</h4>
                <div className="relative flex-1 h-fit rounded-lg bg-green-4 px-3 py-4">
                    <span className="text-2xl text-grey-dark-1">98%</span>
                    <motion.div className="absolute inset-0 rounded-l-lg px-3 py-4 overflow-hidden" initial={{ width: 0 }} whileInView={{ width: "2.3%" }} transition={{ ease: "linear", duration: 0.8 }} style={{ background: "linear-gradient(90.01deg, #136207 0.01%, #55B648 106.72%)"}}>
                        <span className="text-2xl text-white">98%</span>
                    </motion.div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-portal-bg rounded-lg max-w-32 w-full flex items-start gap-1 py-2 px-3">
                    <Icon icon="lucide:thermometer-sun" className="size-4 text-grey-dark-3 mt-1" />
                    <div className="grid gap-1 flex-1">
                        <h4 className="text-grey-dark-3 text-sm text-left">Temperature</h4>
                        <span className="text-grey-dark-1 font-medium text-lg text-left">23°C</span>
                    </div>
                </div>
                <div className="bg-portal-bg rounded-lg max-w-32 w-full flex items-start gap-1 py-2 px-3">
                    <Icon icon="heroicons:bolt" className="size-4 text-grey-dark-3 mt-1" />
                    <div className="grid gap-1 flex-1">
                        <h4 className="text-grey-dark-3 text-sm text-left">Voltage</h4>
                        <span className="text-grey-dark-1 font-medium text-lg text-left">24v</span>
                    </div>
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