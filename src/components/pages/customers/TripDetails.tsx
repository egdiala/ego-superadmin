import React from "react";
import { cn } from "@/libs/cn";
import type { FetchedTripDetails } from "@/types/trips";
import { ProgressCircle } from "@/components/core";
import { formatTime } from "@/utils/textFormatter";
import { TripDetailsFilter } from "../dashboard/TripDetailsFilter";

interface CustomerTripDetailsProps {
    [key: PropertyKey]: any
    data: FetchedTripDetails
    setFilters: any;
    isLoading: boolean;
}

export const CustomerTripDetails: React.FC<CustomerTripDetailsProps> = ({ className, data, isLoading, setFilters }) => {
    const models1 = [
        { label: "Total trip duration", value: formatTime(data?.total_time || 0) },
        { label: "Av. trip distance", value: `${data?.total_dst?.toFixed(2) || 0}km` },
        { label: "Av. daily mileage", value: "0mil" },
    ]
    const models2 = [
        { label: "Av.  trip duration", value: "0hrs : 0mins" },
        { label: "Total idle time", value: "0hrs : 0mins" },
        { label: "Av. idle time", value: "0hrs : 0mins" },
    ]
    return (
        <div className={cn("flex flex-col gap-6 p-4 rounded-lg border border-[#E1E4E6]", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-2 text-xs">Total milage</h4>
                    <span className="text-grey-dark-1 text-xl">{data?.total_dst?.toFixed(2) || 0}km</span>
                </div>
                <TripDetailsFilter setFilters={setFilters} isLoading={isLoading} />
            </div>
            <div className="grid gap-6 max-w-2xl w-full mx-auto">
                <ProgressCircle radius={200} value={1} className="mx-auto">
                    <div className="grid text-center">
                        <h4 className="text-[5rem] font-light text-grey-dark-1">0</h4>
                        <p className="text-sm text-grey-dark-3">MPH</p>
                        <p className="text-sm text-grey-dark-3">Av. Speed</p>
                    </div>
                </ProgressCircle>
                <div className="flex justify-between py-2 w-full">
                    <div className="flex flex-col text-center bg-portal-bg py-2 px-8 gap-1 rounded-lg">
                        <h4 className="text-grey-dark-3 text-sm">Vehicles In Motion</h4>
                        <span className="text-grey-dark-1 font-medium text-lg">0</span>
                    </div>
                    <div className="flex flex-col text-center bg-portal-bg py-2 px-8 gap-1 rounded-lg">
                        <h4 className="text-grey-dark-3 text-sm">Vehicles Idle Vehicles</h4>
                        <span className="text-grey-dark-1 font-medium text-lg">0</span>
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