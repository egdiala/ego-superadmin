import React, { Fragment, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import silver from "@/assets/silver.svg";
import bronze from "@/assets/bronze.svg";
import blankImg from "@/assets/blank.svg";
import { useGetRatings, useGetRider } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { cn } from "@/libs/cn";
import { FetchedRatingCountStatus } from "@/types/ratings";
import { useParams } from "react-router-dom";
import { RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";

export const RiderProfile: React.FC = () => {
    const params = useParams()
    const { data: rider, refetch } = useGetRider("")
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetRatings({ component: "count-status", user_type: "rider", auth_id: params?.id as string })

    const gridItems = useMemo(() => {
        return [
            { label: "Email", value: rider?.email },
            { label: "Phone Number", value: rider?.phone_number },
            { label: "NIN", value: rider?.nin_id?.value === rider?.email ? "-" : rider?.nin_id?.value },
            { label: "Department", value: rider?.department_data?.name ?? "-" },
            { label: "Average Rating", value: <div className="flex items-center gap-1"><Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />{(countStatus as FetchedRatingCountStatus)?.rating?.toFixed(1)}</div> },
            { label: "Supervisor", value: "-" },
        ]
    }, [countStatus, rider?.department_data?.name, rider?.email, rider?.nin_id?.value, rider?.phone_number])

    const tripData = useMemo(() => {
        return [
            {
                label: "Trip Limit",
                gauge: {
                    label: "Spend amount used",
                    value: "(80%)",
                    amount: "₦5,936"
                },
                lowerItems: [
                    { label: "Spend Limit", value: "₦6,000" },
                    { label: "Duration", value: "Weekly" }
                ]
            },
            {
                label: "Free Trip",
                gauge: {
                    label: "Trip limit used",
                    value: "(86%)",
                    amount: "13"
                },
                lowerItems: [
                    { label: "Free Trip Limit", value: "20" },
                    { label: "Duration", value: "Weekly" }
                ]
            }
        ]
    },[])

    useEffect(() => {
        if (rider === undefined) {
            refetch()
        }
    },[rider, refetch])
    return (
        <Fragment>
            <RenderIf condition={!fetchingCountStatus}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-10 bg-green-4 p-4 rounded-lg flex-1">
                            <img
                                src={blankImg}
                                className="size-32 rounded-2xl object-cover"
                                alt={`${rider?.first_name} ${rider?.last_name}`}
                            />
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-8">
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
                        <div className={cn("flex flex-col gap-2 items-center w-full md:max-w-52 py-4 px-12 rounded-lg", rider?.account_type === "staff" ? "bg-green-4" : "bg-yellow-2")}>
                            <img src={rider?.account_type === "staff" ? bronze : silver} />
                            <h2 className="font-bold text-sm text-yellow-0 uppercase">{rider?.account_type}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 pb-6 gap-6">
                        {
                            tripData.map((item) =>
                            <div key={item?.label} className="flex flex-col p-4 gap-6 bg-grey-dark-4 rounded-lg">
                                <h2 className="font-semibold text-base text-grey-dark-1">{item?.label}</h2>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-grey-dark-3">{item?.gauge?.label}</span>
                                        <span className="text-base text-grey-dark-1">{item?.gauge?.amount} {item?.gauge?.value}</span>
                                    </div>
                                    <div className="flex-1 h-2 rounded-full bg-green-3">
                                        <motion.div className="h-2 rounded-full bg-green-1" initial={{ width: "0%" }} whileInView={{ width: "80%" }} transition={{ ease: "linear", duration: 1 }}  />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    {
                                        item?.lowerItems?.map((lowerItem) =>
                                        <div key={lowerItem?.label} className="grid gap-1">
                                            <h4 className="text-sm text-grey-dark-3">{lowerItem?.label}</h4>
                                            <p className="text-sm text-grey-dark-1">{lowerItem?.value}</p>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                            )
                        }
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={fetchingCountStatus}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}