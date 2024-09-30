import React from "react";
import { Icon } from "@iconify/react";
import { FetchedSingleTrip } from "@/types/trips";
import blankImg from "@/assets/blank.svg";

interface TripRiderProps {
    data: FetchedSingleTrip
}

export const TripRider: React.FC<TripRiderProps> = ({ data }) => {
    const infos = [
        { label: "Email", value: data?.rider_data?.email },
        { label: "Phone Number", value: data?.ride_data?.phone_number },
        { label: "Business Name", value: data?.org_data?.name },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <h1 className="text-grey-dark-1 text-base font-semibold">Rider</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center gap-2">
                    <img
                        alt={data?.ride_data?.name}
                        className="size-10 rounded-full object-cover object-center"
                        src={data?.ride_data?.avatar || blankImg}
                    />
                    <div className="grid gap-0.5">
                        <h2 className="font-medium text-sm text-grey-dark-1">{data?.ride_data?.name}</h2>
                        <div className="flex items-center gap-1">
                            <Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />
                            <span className="text-sm text-grey-dark-3">{data?.ride_data?.rating?.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                {
                    infos.map((info) =>
                        <div key={info.label} className="grid gap-1">
                            <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                            <p className="text-grey-dark-1 font-medium text-sm">{info.value || "-"}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}