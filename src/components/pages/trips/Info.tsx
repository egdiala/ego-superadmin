import { FetchedSingleTrip } from "@/types/trips";
import { formatTime } from "@/utils/textFormatter";
import { format, formatRelative } from "date-fns";
import React from "react";

interface TripInfoProps {
    data: FetchedSingleTrip
}

export const TripInfo: React.FC<TripInfoProps> = ({ data }) => {
    const infos = [
        { label: "Trip Reference", value: data?.trip_ref },
        { label: "Est. Time", value: formatTime(data?.ride_data?.est_time) },
        { label: "Est. Distance", value: `${data?.ride_data?.est_dst}km` },
        { label: "Accepted Time", value: `${formatRelative(data?.ride_data?.accepted_at, new Date()).split("at")[0]} • ${format(data?.ride_data?.accepted_at, "p")}` },
        { label: "Trip Start Time", value: data?.ride_data?.start_trip_at ? `${formatRelative(data?.ride_data?.start_trip_at, new Date()).split("at")[0]} • ${format(data?.ride_data?.start_trip_at, "p")}` : "" },
        { label: "Trip End Time", value: data?.ride_data?.end_trip_at ? `${formatRelative(data?.ride_data?.end_trip_at, new Date()).split("at")[0]} • ${format(data?.ride_data?.end_trip_at, "p")}` : "" },
        { label: "Total Trip Distance", value: `${data?.ride_data?.total_distance}km` },
        { label: "Actual Time Spent", value: "2hrs : 24mins" },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 text-base font-semibold">Trip Info</h1>
                <div className="flex items-center justify-center w-fit bg-yellow-3 text-grey-dark-2 text-sm px-2 py-0.5 rounded">
                    Ongoing
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
            {
                infos.map((info) =>
                    <div className="grid gap-1">
                        <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                        <p className="text-grey-dark-1 font-medium text-sm capitalize">{info.value}</p>
                    </div>
                )
            }
            </div>
        </div>
    )
}