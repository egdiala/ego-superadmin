import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { PieChart, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";
import { FetchedDriverCountStatus } from "@/types/drivers";

interface TotalDriversDashboardProps {
    data: FetchedDriverCountStatus;
    [x: string]: any
}

export const TotalDrivers: React.FC<TotalDriversDashboardProps> = ({ className, data }) => {
    const items = useMemo(() => {
        const legend = [
            { label: "Assigned", value: data?.assign, color: "hsla(113, 43%, 50%, 1)" },
            { label: "Unassigned", value: data?.un_assign, color: "hsla(4, 80%, 48%, 1)" },
            { label: "Suspended", value: data?.suspended, color: "hsla(41, 100%, 44%, 1)" },
            { label: "Active", value: data?.active, color: "hsla(205, 92%, 10%, 1)" },
        ]
        return legend.map((item) => ({ id: item.label.toLowerCase(), label: item.label, value: item.value, color: item.color }))
    },[data?.active, data?.assign, data?.suspended, data?.un_assign])
    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-2 text-xs">Total Drivers</h4>
                    <span className="text-grey-dark-1 text-xl">{data?.total}</span>
                </div>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Filter
                </TableAction>
            </div>
            <div className="grid content-center md:grid-cols-2 gap-6">
                <PieChart
                    className="w-full h-32"
                    data={items}
                    colors={items.map((item) => item.color)}
                    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                    innerRadius={0.9}
                    cornerRadius={0.95}
                    activeInnerRadiusOffset={3}
                    activeOuterRadiusOffset={3}
                    isInteractive={false}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    enableArcLabels={false}
                    arcLabelsRadiusOffset={0}
                    motionConfig="wobbly"
                />
                <div className="grid content-center grid-cols-2 gap-y-6">
                    {
                        items.map((item) =>
                        <div key={item.id} className="pl-2 flex flex-col h-fit gap-0.5" style={{ borderLeftWidth: "2px", borderLeftColor: item.color }}>
                            <span className="text-grey-dark-3 text-sm">{item.label}</span>
                            <p className="text-grey-dark-1 font-medium text-base">{item.value}</p>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}