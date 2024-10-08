import { PurchaseModel } from "@/types/organizations";
import type { FetchedSingleTrip } from "@/types/trips";
import { format } from "date-fns";
import React from "react";

interface TripRequestInfoProps {
    data: FetchedSingleTrip
}

export const TripRequestInfo: React.FC<TripRequestInfoProps> = ({ data }) => {
    const infos = [
        { label: "Request Date & Time", value: `${format(data?.createdAt, "d/M/yy")} • ${format(data?.createdAt, "p")}` },
        { label: "Request ID", value: data?.trip_id },
        { label: "Approved by", value: data?.ride_data?.approval_data?.name || "-" },
        (data?.org_data?.purchase_model !== PurchaseModel.EHailing && ({ label: "Approval Date & Time", value: `${format(data?.ride_data?.approval_data?.created || data?.ride_data?.accepted_at, "d/M/yy")} • ${format(data?.ride_data?.approval_data?.created || data?.ride_data?.accepted_at, "p")}` })),
        (data?.org_data?.purchase_model !== PurchaseModel.EHailing && ({ label: "Driver Assigned Date", value: `${format(data?.ride_data?.assigned_data?.created || data?.ride_data?.accepted_at, "d/M/yy")} • ${format(data?.ride_data?.assigned_data?.created || data?.ride_data?.accepted_at, "p")}` })),
        (data?.org_data?.purchase_model !== PurchaseModel.EHailing && ({ label: "Driver Assigned by", value: data?.ride_data?.assigned_data?.name || "-" })),
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
                infos.filter((item) => item !== false).map((info) =>
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