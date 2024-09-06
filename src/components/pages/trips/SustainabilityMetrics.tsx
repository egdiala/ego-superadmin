import React from "react";

export const TripSustainabilityMetrics: React.FC = () => {
    const infos = [
        { label: "Total energy consumed across the trip", value: "0kw" },
        { label: "Av. energy consumption", value: "0kw" },
        { label: "Average kwh per kilometer", value: "0kwh" },
        { label: "State of charge at the beginning of the trip", value: "0%" },
        { label: "State of charge at the end of the trip", value: "0%" },
        { label: "CO2 emissions saved", value: "0kt" },
        { label: "Battery Health at the beginning of the trip", value: "0%" },
        { label: "Battery Health at the end of the trip", value: "0%" },
        { label: "Total emissions avoided", value: "0kt" },
        { label: "Average Speed", value: "0mph" },
    ]
    return (
        <div className="flex flex-col h-fit row-span-2 gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <h1 className="text-grey-dark-1 text-base font-semibold">Sustainability Metrics</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {
                infos.map((info) =>
                    <div className="grid gap-1 content-start">
                        <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                        <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                    </div>
                )
            }
            </div>
        </div>
    )
}