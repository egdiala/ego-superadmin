import React, { Fragment, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import blankImg from "@/assets/blank.svg";
import whiteCar from "@/assets/white_car.svg";
import { useGetDriver, useGetRatings } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { cn } from "@/libs/cn";
import { RenderIf } from "@/components/core";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { PurchaseModel } from "@/types/organizations";
import { useParams } from "react-router-dom";
import { FetchedRatingCountStatus } from "@/types/ratings";
import { Loader } from "@/components/core/Button/Loader";

export const DriverProfilePage: React.FC = () => {
    const params = useParams();
    const { data: driver, refetch } = useGetDriver("")
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetRatings({ component: "count", user_type: "driver", auth_id: params?.id as string })
    const gridItems = useMemo(() => {
        return [
            { label: "Email", value: driver?.email },
            { label: "Phone Number", value: driver?.phone_number },
            { label: "Rating", value: <div className="flex items-center gap-1"><Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />{(countStatus as FetchedRatingCountStatus)?.rating?.toFixed(1) ?? "0"}</div> },
            { label: "Gender", value: driver?.gender },
            { label: "Date of Birth", value: driver?.dob || "-" },
            { label: "State of Origin", value: driver?.state_origin || "-" },
            { label: "Business assigned to", value: driver?.org_data?.name ?? "CabZero Business" },
        ]
    },[countStatus, driver?.dob, driver?.email, driver?.gender, driver?.org_data?.name, driver?.phone_number, driver?.state_origin])
    useEffect(() => {
        if (driver === undefined) {
            refetch()
        }
    },[driver, refetch])
    return (
        <Fragment>
            <RenderIf condition={!fetchingCountStatus}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-10 bg-green-4 p-4 rounded-lg">
                        <img
                            src={driver?.avatar || blankImg}
                            className="size-32 rounded-2xl object-cover"
                            alt="user"
                        />
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-y-8">
                            {
                                gridItems.map((item) =>
                                <div key={item.label} className="grid gap-1 group">
                                    <h4 className="text-grey-dark-3 text-sm">{item.label}</h4>
                                    <span className="text-grey-dark-1 text-sm capitalize group-first:lowercase">{item.value}</span>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 w-full border border-grey-dark-4 rounded-lg py-4 px-5">
                        <h2 className="font-semibold text-base text-grey-dark-1">ID & Vehicle Info</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                            <div className="grid gap-1">
                                <h4 className="text-grey-dark-3 text-sm">NIN</h4>
                                <span className="text-grey-dark-1 text-sm">{driver?.nin_id?.value}</span>
                            </div>
                            <div className="grid gap-1">
                                <h4 className="text-grey-dark-3 text-sm">Driver’s License No.</h4>
                                <span className="text-grey-dark-1 text-sm">{driver?.driver_license_id?.value}</span>
                            </div>
                            <div className="grid gap-1">
                                <h4 className="text-grey-dark-3 text-sm">Vehicle Assignment Status</h4>
                                <div className={cn("text-white text-sm px-2 py-0.5 rounded w-fit", driver?.vehicle_data?.driver_assigned ? "bg-green-1" : "bg-semantics-error")}>{driver?.vehicle_data?.driver_assigned ? "Assigned" : "Unassigned"}</div>
                            </div>
                            <RenderIf condition={!!driver?.vehicle_data?.driver_assigned}>
                            <div className="flex items-center gap-2">
                                <img src={whiteCar} alt="vehicle" className="object-cover object-center w-12" />
                                <div className="grid gap-1">
                                    <h4 className="text-grey-dark-1 fon-medium text-sm">{driver?.vehicle_data?.plate_number}</h4>
                                    <span className="text-grey-dark-2 text-sm">{driver?.vehicle_data?.car_model}</span>
                                </div>
                            </div>
                            </RenderIf>
                            <RenderIf condition={!!driver?.org_data?._id}>
                            <div className="grid gap-1">
                                <h4 className="text-grey-dark-3 text-sm">Model</h4>
                                <span className="text-grey-dark-1 text-sm">{pascalCaseToWords(PurchaseModel[driver?.org_data?.purchase_model!] ?? "")}</span>
                            </div>
                            </RenderIf>
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={fetchingCountStatus}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>

        </Fragment>
    )
}