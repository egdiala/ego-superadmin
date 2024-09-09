import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { EmptyState, RenderIf, TableAction } from "@/components/core";

interface TopCommutersDashboardProps {
    data: any[]
    [key: PropertyKey]: any
}

export const TopCommuters: React.FC<TopCommutersDashboardProps> = ({ className, data }) => {
    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 font-semibold text-xl">Top Commuters</h1>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    By Trips
                    <Icon icon="ph:caret-down" className="size-4" />
                </TableAction>
            </div>
            <RenderIf condition={data.length > 0}>
            <div className="grid gap-6">
                {
                    data.map((_, id) =>
                    <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-grey-dark-1">{id + 1}.</span>
                            <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Wade Warren" className="object-cover object-center size-7 rounded-full" />
                            <span className="text-sm text-grey-dark-2">Wade Warren</span>
                        </div>
                        <span className="text-sm text-grey-dark-1">25</span>
                    </div>
                    )
                }
            </div>
            </RenderIf>
            <RenderIf condition={data.length === 0}>
                <EmptyState emptyStateText="We couldn't find any top commuters" />
            </RenderIf>
        </div>
    )
}