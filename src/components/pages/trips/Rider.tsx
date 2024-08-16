import React from "react";
import { Icon } from "@iconify/react";

export const TripRider: React.FC = () => {
    const infos = [
        { label: "Email", value: "example@gmail.com" },
        { label: "Phone Number", value: "0814 5632 783" },
        { label: "Business Name", value: "Infinity Payroll Services" },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <h1 className="text-grey-dark-1 text-base font-semibold">Rider</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center gap-2">
                    <img
                        alt="Albert Okoli"
                        className="size-10 rounded-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <div className="grid gap-0.5">
                        <h2 className="font-medium text-sm text-grey-dark-1">Albert Okoli</h2>
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
            </div>
        </div>
    )
}