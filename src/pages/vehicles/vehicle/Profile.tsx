import React, { useEffect, useMemo } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import blankImg from "@/assets/blank.svg";
import vehicleImg from "@/assets/vehicle.svg";
import { useGetVehicle } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { DistanceStats, VehicleBatteryHealth } from "@/components/pages/vehicles";

export const VehicleProfilePage: React.FC = () => {
    const { data: vehicle, refetch } = useGetVehicle("")

    useEffect(() => {
        if (vehicle === undefined) {
            refetch()
        }
    }, [vehicle, refetch])

    const vehicleDetails = useMemo(() => {
        return [
            { label: "OEM/Model", value: vehicle?.car_model },
            { label: "Year of manufacture", value: vehicle?.year_manufacture },
            { label: "Online Status", value: <div className={cn(vehicle?.online ? "text-grey-dark-2 bg-green-3" : "text-grey-dark-1 bg-yellow-1", "w-fit rounded px-2 py-0.5 font-medium text-sm")}>{vehicle?.online ? "Online" : "Offline"}</div> },
            { label: "Mileage", value: vehicle?.mileage },
            { label: "Purchase Year", value: vehicle?.year_purchase },
            { label: "Vehicle Status", value: <div className={cn(vehicle?.status === 1 ? "text-grey-dark-2 bg-green-3" : "text-grey-dark-1 bg-yellow-1", "w-fit rounded px-2 py-0.5 font-medium text-sm")}>{vehicle?.status === 1 ? "Active" : "Inactive"}</div> },
        ]
    }, [vehicle?.car_model, vehicle?.mileage, vehicle?.online, vehicle?.status, vehicle?.year_manufacture, vehicle?.year_purchase])

    const vehicleID = useMemo(() => {
        return [
            { label: "Vehicle Identification Number (VIN)", value: vehicle?.car_vin },
            { label: "Chassis Number", value: vehicle?.chassis_number },
            { label: "Engine Number", value: vehicle?.engine_number },
            { label: "Dashcam IMEI (if available)", value: vehicle?.car_imei },
        ]
    }, [vehicle?.car_imei, vehicle?.car_vin, vehicle?.chassis_number, vehicle?.engine_number])

    const payment = useMemo(() => {
        return [
            { label: "Vehicle Cost", value: "₦0" },
            { label: "Revenue Generated by Vehicle", value: "₦0" },
            { label: "Vehicle Payment Model", value: "-" },
            { label: "Amount paid back", value: "₦0" },
        ]
    }, [])
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="md:col-span-2 lg:col-span-3 flex flex-col md:flex-row md:items-center gap-14 py-4 px-5 bg-green-4 rounded-lg">
                    <div className="grid gap-2 pl-6 pr-8 md:border-r md:border-r-input-filled">
                        <img src={vehicleImg} alt="vehicle" className="md:w-auto w-56" />
                        <div className="grid gap-1 md:text-center">
                            <h1 className="font-semibold text-xl text-grey-dark-1">{vehicle?.plate_number}</h1>
                            <p className="text-sm text-grey-dark-1">{vehicle?.car_color}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
                        {
                            vehicleDetails?.map((item) => 
                                <div key={item.label} className="grid gap-1">
                                    <h4 className="text-sm text-grey-dark-3">{item?.label}</h4>
                                    <p className="text-sm text-grey-dark-1">{item?.value}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="grid content-center justify-items-center rounded-lg p-2 md:p-0 bg-[#428139] w-full">
                    <div className="grid content-center justify-items-center  rounded-full my-auto mx-auto size-40 bg-green-1">
                        <div className="grid gap-1 content-center justify-items-center size-28 bg-dark-green-1 rounded-full text-white" style={{ boxShadow: "0px 0px 14.22px -4.25px rgba(0, 0, 0, 0.39)" }}>
                            <span className="text-4xl">0<sub className="text-base">%</sub></span>
                            <p className="text-[0.625rem]/4">Battery Health</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-6 border border-grey-dark-4 rounded-lg py-4 px-5">
                    <h2 className="font-semibold text-base text-grey-dark-1">Vehicle ID</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {
                            vehicleID?.map((item) =>
                                <div key={item.label} className="grid gap-1">
                                    <h4 className="text-sm text-grey-dark-3">{item?.label}</h4>
                                    <p className="text-sm text-grey-dark-1">{item?.value}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="grid gap-6 border border-grey-dark-4 rounded-lg py-4 px-5">
                    <h2 className="font-semibold text-base text-grey-dark-1">Payment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {
                            payment?.map((item) =>
                                <div key={item.label} className="grid gap-1">
                                    <h4 className="text-sm text-grey-dark-3">{item?.label}</h4>
                                    <p className="text-sm text-grey-dark-1">{item?.value}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-6 border border-grey-dark-4 rounded-lg py-4 px-5">
                    <h2 className="font-semibold text-base text-grey-dark-1">Driver</h2>
                    <div className="grid content-start grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-2">
                            <img src={blankImg} className="size-10 rounded-full object-cover" alt="user" />
                            <div className="grid gap-0.5">
                                <h4 className="text-sm font-medium text-grey-dark-1">{vehicle?.driver_data?.first_name} {vehicle?.driver_data?.last_name}</h4>
                                <div className="flex items-center gap-1 text-grey-dark-3"><Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />0</div>
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <h4 className="text-sm text-grey-dark-3">Driver Status</h4>
                            <div className={cn(vehicle?.driver_assigned ? "bg-green-3" : "bg-yellow-3", "flex w-fit rounded items-center text-grey-dark-2 px-2 py-0.5 text-sm")}>{vehicle?.driver_assigned ? "Assigned" : "Unassigned"}</div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-6 border border-grey-dark-4 rounded-lg py-4 px-5">
                    <h2 className="font-semibold text-base text-grey-dark-1">Others</h2>
                    <div className="grid grid-cols-2">
                        <div className="flex items-center gap-2">
                            <div className="relative size-16 rounded">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="qrCode" className="object-cover" />
                                <div className="absolute p-0.5 bottom-0.5 right-1 bg-white rounded-sm grid place-content-center" style={{ boxShadow: "0px 0px 5.85px -0.93px rgba(10, 75, 75, 0.2)" }}>
                                    <Icon icon="lucide:scan" className="text-green-1 size-2" />
                                </div>
                            </div>
                            <div className="flex flex-col h-full py-1.5 justify-between">
                                <span className="text-green-base underline font-medium text-sm">View</span>
                                <span className="text-green-base underline font-medium text-sm">Download</span>
                            </div>
                        </div>
                        <div className="grid gap-1 content-start">
                            <h4 className="text-sm text-grey-dark-3">Business Assigned To</h4>
                            <p className="text-sm text-grey-dark-1">{vehicle?.org_data?.name ?? "CabZero Business"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DistanceStats />
                <VehicleBatteryHealth />
            </div>
        </motion.div>
    )
}