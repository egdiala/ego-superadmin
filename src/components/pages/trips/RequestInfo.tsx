import React from "react";

export const TripRequestInfo: React.FC = () => {
    const infos = [
        { label: "Request Date & Time", value: "Today • 12:34pm" },
        { label: "Request ID", value: "39i439HIJD03" },
        { label: "Approved by", value: "Gbemiro John" },
        { label: "Approval Date & Time", value: "Today • 12:34pm" },
        { label: "Driver Assigned Date", value: "Today • 12:34pm" },
        { label: "Driver Assigned by", value: "James Tori" },
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 text-base font-semibold">Trip Request info</h1>
                <div className="flex items-center justify-center w-fit bg-grey-dark-1/10 text-grey-dark-1 text-sm px-2 py-0.5 rounded">
                    Assigned
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