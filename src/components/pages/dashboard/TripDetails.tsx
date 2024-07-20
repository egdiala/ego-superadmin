import React from "react";
import { cn } from "@/libs/cn";

interface TripDetailsDashboardProps {
    [x: string]: any
}

export const TripDetails: React.FC<TripDetailsDashboardProps> = ({ className }) => {
    const models1 = [
        { label: "Av. trip distance", value: "2,936km" },
        { label: "Total trip duration", value: "45hrs : 24mins" },
        { label: "Av.  trip duration", value: "2hrs : 24mins" },
    ]
    const models2 = [
        { label: "Av. idle time", value: "45hrs : 24mins" },
        { label: "Av. Speed", value: "45km/h" },
        { label: "Av.  trip duration", value: "2hrs : 24mins" },
    ]
    return (
        <div className={cn("flex flex-col gap-6 px-4 pt-4 pb-7 rounded-lg bg-white", className)}>
            <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                <h4 className="text-grey-dark-2 text-xs">Av. fare per trip</h4>
                <span className="text-grey-dark-1 text-xl">₦5,936</span>
            </div>
            <div className="flex items-center gap-5 justify-between">
            {
                models1.map((item) =>
                <div key={item.label} className="grid gap-1">
                    <h4 className="text-grey-dark-2 text-xs text-left">{item.label}</h4>
                    <span className="text-grey-dark-1 text-lg text-left">{item.value}</span>
                </div>
                )
            }
            </div>
            <div className="flex items-center gap-5 justify-between">
            {
                models2.map((item) =>
                <div key={item.label} className="grid gap-1">
                    <h4 className="text-grey-dark-2 text-xs text-left">{item.label}</h4>
                    <span className="text-grey-dark-1 text-lg text-left">{item.value}</span>
                </div>
                )
            }
            </div>
            <div className="grid gap-1">
                <span className="text-grey-dark-3 text-xs">Most frequented destination</span>
                <p className="text-grey-dark-1 text-sm">Sterling Towers, 20 Marina Rd, Lagos Island, Lagos 102273, Lagos</p>
            </div>
            <div className="grid gap-1">
                <span className="text-grey-dark-3 text-xs">Most frequent reason for commute</span>
                <p className="text-grey-dark-1 text-sm">Lorem ipsum dolor sit amet consectetur. Neque est eget augueLorem ipsum dolor sit amet consectetur. Neque est eget augue</p>
            </div>
        </div>
    )
}