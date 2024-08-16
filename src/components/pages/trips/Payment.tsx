import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"


export const TripPayment: React.FC = () => {
    const infos = [
        { label: "Trip payment Model", value: "Lease" },
        { label: "Additional Km", value: "0km" },
        { label: "Addtional fee", value: "₦0" }
    ]
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-grey-dark-1 text-base font-semibold">Payment</h1>
                    <Popover as={Fragment}>
                        <PopoverButton className="block focus:outline-none data-[active]:text-grey-dark-1 data-[hover]:text-grey-dark-2 data-[focus]:outline-0 data-[focus]:outline-none">
                            <sup><Icon icon="ph:info-fill" className="text-grey-dark-3 size-3" /></sup>
                        </PopoverButton>
                        <PopoverPanel
                            transition
                            anchor="top"
                            className="bg-grey-dark-1 overflow-visible w-64 py-2 px-3.5 flex flex-col gap-1.5 rounded text-white transition duration-500 ease-in-out data-[closed]:-translate-y-5 -mt-3.5 ml-0.5 data-[closed]:opacity-0"
                        >
                            <span className="text-xs text-yellow-1 text-left">Lease Model Payment</span> 
                            <p className="text-sm text-white">For lease plan, 120km covered at ₦83,393.20. Additional km is priced at ₦694.94/km</p>
                            <div className="size-3 absolute inset-x-0 left-[46.3%] -bottom-1.5 rotate-45 flex items-center justify-center bg-grey-dark-1" />
                        </PopoverPanel>
                    </Popover>
                    
                </div>
                <div className="flex items-center justify-center w-fit bg-yellow-3 text-grey-dark-2 text-sm px-2 py-0.5 rounded">
                    Pending
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
            {
                [infos[0]].map((info) =>
                    <div className="grid gap-1">
                        <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                        <p className="text-grey-dark-1 font-medium text-sm">{info.value}</p>
                    </div>
                )
            }
            <div className="grid gap-1">
                <h3 className="text-grey-dark-3 text-sm">Trip Fare</h3>
                <div className="flex items-center justify-center w-fit bg-green-3 text-dark-green-1 text-sm px-2 py-0.5 rounded">
                    Covered by Plan
                </div>
            </div>
            {
                infos.slice(1,3).map((info) =>
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