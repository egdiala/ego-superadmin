import React, { Fragment, useCallback, useMemo, useState } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { differenceInSeconds } from "date-fns"
import { Button, RenderIf } from "@/components/core"
import { PurchaseModel } from "@/types/organizations"
import type { FetchedSingleTrip } from "@/types/trips"
import { formattedNumber, formatTime, pascalCaseToWords } from "@/utils/textFormatter"
import { Dialog, DialogPanel, DialogTitle, Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

interface TripPaymentProps {
    data: FetchedSingleTrip
}

export const TripPayment: React.FC<TripPaymentProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen])
    
    const infos = useMemo(() => {
        return [
            { label: "Trip payment Model", value: pascalCaseToWords(PurchaseModel[data?.org_data?.purchase_model]) },
            (data?.org_data?.purchase_model === PurchaseModel.Lease && ({ label: "Trip Fare", value: <div className="flex items-center justify-center w-fit bg-green-3 text-dark-green-1 text-sm px-2 py-0.5 rounded">Covered by Plan</div> })),
            (data?.org_data?.purchase_model === PurchaseModel.Lease && ({ label: "Additional Km", value: "0km" })),
            (data?.org_data?.purchase_model === PurchaseModel.Lease && ({ label: "Addtional fee", value: "₦0" })),
            (data?.org_data?.purchase_model !== PurchaseModel.Lease && ({ label: "Estimated Fare", value: `${formattedNumber(data?.ride_data?.min_fare, { maximumFractionDigits: 0 })} - ${formattedNumber(data?.ride_data?.max_fare, { maximumFractionDigits: 0 })}` })),
            (data?.org_data?.purchase_model === PurchaseModel.StaffCommute && ({ label: <div className="flex">Actual Trip Fare<button type="button" onClick={toggleIsOpen}><sup><Icon icon="ph:info-fill" className="text-grey-dark-3 size-3" /></sup></button></div>, value: formattedNumber(data?.ride_data?.fare) })),
            (data?.org_data?.purchase_model === PurchaseModel.EHailing && ({ label: "Actual Amount Paid", value: formattedNumber(data?.ride_data?.fare) })),
            (data?.org_data?.purchase_model !== PurchaseModel.Lease && ({ label: "Discount", value: formattedNumber(parseInt(data?.ride_data?.fare_params?.discount_value || "0")) })),
            (data?.org_data?.purchase_model === PurchaseModel.EHailing && ({ label: "Additional Fee", value: "0" })),
        ]
    },[data?.org_data?.purchase_model, data?.ride_data?.fare, data?.ride_data?.fare_params?.discount_value, data?.ride_data?.max_fare, data?.ride_data?.min_fare, toggleIsOpen])

    const fareBreakdown = useMemo(() => {
        return [
            { label: "Base Fare", value: formattedNumber(parseInt(data?.ride_data?.fare_params?.charge_base)) },
            { label: "State Tax", value: formattedNumber(parseInt(data?.ride_data?.fare_params?.charge_tax)) },
            {
                label: "Trip Time",
                value: <div className="grid justify-items-end"><span>{formattedNumber(parseInt(data?.ride_data?.fare_params?.charge_time))}</span><span className="text-xs text-grey-dark-3">{formatTime(differenceInSeconds(data?.ride_data?.end_trip_at as Date,  data?.ride_data?.start_trip_at as Date) || 0)}</span></div>
            },
            {
                label: "Distance Covered",
                value: <div className="grid justify-items-end"><span>{formattedNumber(parseInt(data?.ride_data?.fare_params?.charge_distance))}</span><span className="text-xs text-grey-dark-3">{data?.ride_data?.total_distance}km</span></div>
            },
            { label: "Waiting Fee", value: formattedNumber(parseInt(data?.ride_data?.fare_params?.charge_delay)) },
            { label: "Discount", value: formattedNumber(parseInt(data?.ride_data?.fare_params?.discount_value || "0")) },
        ]
    }, [data?.ride_data?.end_trip_at, data?.ride_data?.fare_params?.charge_base, data?.ride_data?.fare_params?.charge_delay, data?.ride_data?.fare_params?.charge_distance, data?.ride_data?.fare_params?.charge_tax, data?.ride_data?.fare_params?.charge_time, data?.ride_data?.fare_params?.discount_value, data?.ride_data?.start_trip_at, data?.ride_data?.total_distance])
    
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <div className="relative flex items-center">
                    <h1 className="text-grey-dark-1 text-base font-semibold">Payment</h1>
                    <RenderIf condition={data?.org_data?.purchase_model === PurchaseModel.Lease}>
                        <Popover as={Fragment}>
                            <PopoverButton className="block focus:outline-none data-[active]:text-grey-dark-1 data-[hover]:text-grey-dark-2 data-[focus]:outline-0 data-[focus]:outline-none">
                                <sup><Icon icon="ph:info-fill" className="text-grey-dark-3 size-3" /></sup>
                            </PopoverButton>
                            <PopoverPanel
                                transition
                                anchor="top" as="section"
                                style={{ boxShadow: "0px 7px 20.6px 0px rgba(0, 0, 0, 0.25)" }}
                                className="scrollbar-hide bg-grey-dark-1 overflow-visible w-64 py-2 px-3.5 flex flex-col gap-1.5 rounded text-white transition duration-500 ease-in-out data-[closed]:-translate-y-5 -mt-3.5 ml-0.5 data-[closed]:opacity-0"
                            >
                                <span className="text-xs text-yellow-1 text-left">Lease Model Payment</span> 
                                <p className="text-sm text-white">For lease plan, 120km covered at ₦83,393.20. Additional km is priced at ₦694.94/km</p>
                                <div className="size-3 absolute inset-x-0 left-[46.3%] -bottom-1.5 rotate-45 flex items-center justify-center bg-grey-dark-1" />
                            </PopoverPanel>
                        </Popover>
                    </RenderIf>
                </div>
                <div className={cn("text-sm text-grey-dark-2 capitalize whitespace-nowrap px-2 py-0.5 rounded", data?.ride_data?.charge_data?.status === "pending" && "text-semantics-amber bg-semantics-amber/10", data?.ride_data?.charge_data?.status === "yes" && "text-semantics-success bg-semantics-success/10")}>
                    <RenderIf condition={data?.ride_data?.charge_data?.status === "pending"}>
                        {data?.ride_data?.charge_data?.status}
                    </RenderIf>
                    <RenderIf condition={data?.ride_data?.charge_data?.status === "yes"}>
                        Successful
                    </RenderIf>
                </div>
            </div>
            <div className={cn("grid gap-6", data?.org_data?.purchase_model === PurchaseModel.Lease ? "grid-cols-2" : "grid-cols-3")}>
            {
                infos.filter((item) => item !== false).map((info, idx) =>
                    <div key={idx} className="grid gap-1">
                        <h3 className="text-grey-dark-3 text-sm">{info.label}</h3>
                        <p className="text-grey-dark-1 font-medium text-sm capitalize">{info.value}</p>
                    </div>
                )
            }
            </div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={toggleIsOpen}>
            <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
                <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                    <DialogPanel transition className="flex flex-col gap-4 justify-between w-full max-w-[39.375rem] rounded bg-white p-4 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Fare Breakdown
                        </DialogTitle>
                        <div className="grid gap-4 bg-green-4 rounded-lg p-2">
                            {
                                fareBreakdown.map((item) => 
                                    <div key={item.label} className="flex items-center justify-between border-b border-b-dark-green-3 last:border-b-transparent pb-2">
                                        <span className="text-xs text-grey-dark-2">{item.label}</span>
                                        <div className="font-medium text-sm text-grey-dark-1">{item.value}</div>
                                    </div>
                                )
                            }
                            <div className="flex flex-col gap-1 pt-6 text-center">
                                <span className="text-xs text-grey-dark-3">Total</span>
                                <h4 className="text-3xl text-grey-dark-1 font-normal">{formattedNumber(data?.ride_data?.fare)}</h4>
                                <span className="capitalize text-green-1 font-semibold text-sm">
                                    <RenderIf condition={data?.ride_data?.charge_data?.status === "pending"}>
                                        {data?.ride_data?.charge_data?.status}
                                    </RenderIf>
                                    <RenderIf condition={data?.ride_data?.charge_data?.status === "yes"}>
                                        Paid
                                    </RenderIf>
                                </span>
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-40">
                            <Button type="button" theme="tertiary" onClick={toggleIsOpen} block>Close</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
            </Dialog>
        </div>
    )
}