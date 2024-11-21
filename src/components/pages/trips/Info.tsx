import { RenderIf } from "@/components/core";
import { cn } from "@/libs/cn";
import { PurchaseModel } from "@/types/organizations";
import { FetchedSingleTrip } from "@/types/trips";
import { formatTime } from "@/utils/textFormatter";
import { differenceInSeconds, format } from "date-fns";
import React from "react";

interface TripInfoProps {
    data: FetchedSingleTrip
}

export const TripInfo: React.FC<TripInfoProps> = ({ data }) => {
    const yellow = ["PICKED_RIDER","ENROUTE_TO_DROPOFF",]
    const green = ["REQUEST_ACCEPTED",  "ARRIVED_AT_PICKUP", "COMPLETED"]
    const red = ["CANCELED"]
    const infos = [
        { label: "Trip Reference", value: data?.trip_ref },
        { label: "Est. Time", value: formatTime(data?.ride_data?.est_time) },
        { label: "Est. Distance", value: `${data?.ride_data?.est_dst.toFixed(2)}km` },
        { label: "Accepted Time", value: `${format(data?.ride_data?.accepted_at, "d/M/yy")} • ${format(data?.ride_data?.accepted_at, "p")}` },
        { label: "Trip Start Time", value: data?.ride_data?.start_trip_at ? `${format(data?.ride_data?.start_trip_at, "d/M/yy")} • ${format(data?.ride_data?.start_trip_at, "p")}` : "" },
        { label: "Trip End Time", value: data?.ride_data?.end_trip_at ? `${format(data?.ride_data?.end_trip_at, "d/M/yy")} • ${format(data?.ride_data?.end_trip_at, "p")}` : "" },
        { label: "Total Trip Distance", value: `${data?.ride_data?.total_distance.toFixed(2)}km` },
        { label: "Actual Time Spent", value: formatTime(differenceInSeconds(data?.ride_data?.end_trip_at as Date,  data?.ride_data?.start_trip_at as Date) || 0) },
        (data?.org_data?.purchase_model === PurchaseModel.StaffCommute && ({ label: "Waiting Time", value: formatTime(data?.ride_data?.waiting_time) })),
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 text-base font-semibold">Trip Info</h1>
                <div className={cn("flex items-center justify-center w-fit capitalize text-sm px-2 py-0.5 rounded", green.includes(data?.ride_status) && "text-dark-green-1 bg-green-3", yellow.includes(data?.ride_status) && "bg-yellow-3 text-grey-dark-2", red.includes(data?.ride_status) && "bg-semantics-error/10 text-semantics-error")}>
                    {data?.ride_status?.toLowerCase()}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
            {
                infos.filter((item) => item !== false).map((info) =>
                    <RenderIf condition={!!info.value}>
                        <div key={info.label} className="grid gap-1">
                            <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                            <p className="text-grey-dark-1 font-medium text-sm capitalize">{info.value}</p>
                        </div>
                    </RenderIf>
                )
            }
            </div>
        </div>
    )
}