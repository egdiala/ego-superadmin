import { FetchedSingleTrip } from "@/types/trips";
import { format } from "date-fns";
import React from "react";

interface TripRequestInfoProps {
    data: FetchedSingleTrip
}

export const TripRequestInfo: React.FC<TripRequestInfoProps> = ({ data }) => {
    const infos = [
        { label: "Request Date & Time", value: `${format(data?.createdAt, "dd MMM, yyyy")} • ${format(data?.createdAt, "p")}` },
        { label: "Request ID", value: data?.trip_id },
        { label: "Approved by", value: "Gbemiro John" },
        { label: "Approval Date & Time", value: "Today • 12:34pm" },
        { label: "Driver Assigned Date", value: `${format(data?.ride_data?.accepted_at, "dd MMM, yyyy")} • ${format(data?.ride_data?.accepted_at, "p")}` },
        { label: "Driver Assigned by", value: "James Tori" },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 text-base font-semibold">Trip Request info</h1>
                <div className="flex items-center justify-center w-fit bg-grey-dark-1/10 text-grey-dark-1 text-sm px-2 py-0.5 rounded">
                    {data?.driver_id ? "Assigned" : "Unassigned"}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
            {
                infos.map((info) =>
                    <div key={info.label} className="grid gap-1">
                        <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                        <p className="text-grey-dark-1 font-medium text-sm capitalize text-ellipsis whitespace-nowrap overflow-hidden">{info.value}</p>
                    </div>
                )
            }
            </div>
        </div>
    )
}