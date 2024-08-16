import React from "react";

export const TripInfo: React.FC = () => {
    const infos = [
        { label: "Trip Reference", value: "39i439HIJD03" },
        { label: "Est. Time", value: "2hrs : 24mins" },
        { label: "Est. Distance", value: "124km" },
        { label: "Accepted Time", value: "Today • 12:34pm" },
        { label: "Trip Start Time", value: "Today • 12:34pm" },
        { label: "Trip End Time", value: "Today • 12:34pm" },
        { label: "Total Trip Distance", value: "124km" },
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
                        <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                    </div>
                )
            }
            </div>
        </div>
    )
}