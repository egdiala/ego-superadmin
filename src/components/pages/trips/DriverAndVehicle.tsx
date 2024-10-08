import React from "react";
import { Icon } from "@iconify/react";
import vehicleSvg from "@/assets/vehicle.svg"
import { PurchaseModel } from "@/types/organizations";
import { RenderIf } from "@/components/core";
import { cn } from "@/libs/cn";

interface TripDriverAndVehicleProps {
    data: {
        latitude: number;
        longitude: number;
        driver_id: string;
        avatar: string;
        plate_number: string;
        car_model: string;
        rating: number;
        phone_number: string;
        purchase_model: number;
        email: string;
        name: string;
        pickup_distance: number;
        total_distance: number;
    } | undefined
}

export const TripDriverAndVehicle: React.FC<TripDriverAndVehicleProps> = ({ data }) => {
    const infos = [
        { label: "Email", value: data?.email },
        { label: "Phone Number", value: data?.phone_number },
    ]
    const information = [
        { label: "Total Km covered by vehicle before the time of the trip", value: `${data?.pickup_distance}km` },
        { label: "Total Km covered by vehicle as at the time of the trip", value: `${data?.total_distance}km` },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <h1 className="text-grey-dark-1 text-base font-semibold">Driver & Vehicle</h1>
            <div className={cn("grid gap-6", data?.purchase_model === PurchaseModel.Lease ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2")}>
                <div className="flex items-center gap-2">
                    <img
                        alt={data?.name}
                        className="size-10 rounded-full object-cover object-center"
                        src={data?.avatar}
                    />
                    <div className="grid gap-0.5">
                        <h2 className="font-medium text-sm text-grey-dark-1">{data?.name}</h2>
                        <div className="flex items-center gap-1">
                            <Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />
                            <span className="text-sm text-grey-dark-3">{data?.rating?.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                {
                    infos.map((info) =>
                        <div key={info.label} className="grid gap-1 content-start">
                            <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                            <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                        </div>
                    )
                }
                <div className="flex items-start gap-2">
                    <img
                        alt={data?.plate_number}
                        className="h-9 w-20"
                        src={vehicleSvg}
                    />
                    <div className="grid gap-0.5">
                        <h2 className="font-medium text-sm text-grey-dark-1">{data?.plate_number}</h2>
                        <p className="text-sm text-grey-dark-2">{data?.car_model}</p>
                    </div>
                </div>
                <RenderIf condition={data?.purchase_model === PurchaseModel.Lease}>
                {
                    information.map((info) =>
                        <div key={info.label} className="grid gap-1">
                            <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                            <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                        </div>
                    )
                }
                </RenderIf>
            </div>
        </div>
    )
}