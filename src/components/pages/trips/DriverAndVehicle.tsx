import React from "react";
import { Icon } from "@iconify/react";
import vehicleSvg from "@/assets/vehicle.svg"

export const TripDriverAndVehicle: React.FC = () => {
    const infos = [
        { label: "Email", value: "example@gmail.com" },
        { label: "Phone Number", value: "0814 5632 783" },
    ]
    const information = [
        { label: "Total Km covered by vehicle before the time of the trip", value: "124km" },
        { label: "Total Km covered by vehicle as at the time of the trip", value: "124km" },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <h1 className="text-grey-dark-1 text-base font-semibold">Driver & Vehicle</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-2">
                    <img
                        alt="Ronald Julius"
                        className="size-10 rounded-full object-cover object-center"
                        src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <div className="grid gap-0.5">
                        <h2 className="font-medium text-sm text-grey-dark-1">Ronald Julius</h2>
                        <div className="flex items-center gap-1">
                            <Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />
                            <span className="text-sm text-grey-dark-3">4.7</span>
                        </div>
                    </div>
                </div>
                {
                    infos.map((info) =>
                        <div className="grid gap-1">
                            <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                            <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                        </div>
                    )
                }
                <div className="flex items-center gap-2">
                    <img
                        alt="ABC123DEF"
                        className="h-9 w-20"
                        src={vehicleSvg}
                    />
                    <div className="grid gap-0.5">
                        <h2 className="font-medium text-sm text-grey-dark-1">ABC123DEF</h2>
                        <p className="text-sm text-grey-dark-2">Caspain</p>
                    </div>
                </div>
                {
                    information.map((info) =>
                        <div className="grid gap-1">
                            <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                            <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}