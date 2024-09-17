import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import blankImg from "@/assets/blank.svg";
import type { TopRidersType } from "@/types/riders";
import { EmptyState, RenderIf, TableAction } from "@/components/core";

interface TopCommutersDashboardProps {
    data: TopRidersType[]
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
                    data.map((rider, id) =>
                    <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-grey-dark-1">{id + 1}.</span>
                            <img src={rider?.user_data?.avatar || blankImg} alt={rider?.user_data?.first_name ?? `user-${id}`} className="object-cover object-center size-7 rounded-full" />
                            <span className="text-sm text-grey-dark-2">{rider?.user_data?.first_name ?? ""} {rider?.user_data?.last_name ?? ""}</span>
                        </div>
                        <span className="text-sm text-grey-dark-1">{rider?.total}</span>
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