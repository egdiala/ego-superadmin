import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";
import { RenderIf } from "@/components/core";
import { CustomerBatteryDetails, CustomerServiceRequests, CustomerTotalTrips, CustomerTripDetails } from "@/components/pages/customers";
import { useGetOrganization } from "@/services/hooks/queries";
import { PurchaseModel } from "@/types/organizations";

export const CustomerDashboardPage: React.FC = () => {
    const { data: customer, refetch } = useGetOrganization("")
    const firstRowItems = [
        {
            label: "Total Amount Paid so far",
            value: "₦134,356,593"
        },
        {
            label: "Total Outstanding Payment",
            value: "₦134,356,593",
            icon: "mdi:naira"
        },
        {
            label: "Total Vehicles Assigned",
            value: "4,535",
            icon: "ri:car-fill"
        },
    ]
    const secondRowItems = [
        {
            label: "Total Completed Trips",
            value: "4,535",
            icon: "bx:trip"
        },
        {
            label: "Total Distance Covered by all Vehicles",
            value: "14,535km",
            icon: "ion:speedometer"
        },
        (PurchaseModel.Lease !== customer?.purchase_model! && ({
            label: "Average kilometers covered by the vehicle",
            value: "4,535km",
            icon: "ion:speedometer"
        })),
    ]
    useEffect(() => {
        if (customer === undefined) {
            refetch()
        }
    },[customer, refetch])
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    firstRowItems.map((item, id) =>
                        <div key={id} className="grid gap-8 content-between first:bg-green-4 bg-[#FDF2F2] last:bg-portal-bg rounded-lg px-4 pt-4 pb-3">
                            <div className="flex items-start justify-between">
                                <span className="text-xs text-grey-dark-2">{item.label}</span>
                                <RenderIf condition={!!item.icon}>
                                    <Icon icon={item.icon as string} className="size-8 text-grey-dark-3/30" />
                                </RenderIf>
                            </div>
                            <h2 className="text-xl text-grey-dark-1">{item.value}</h2>
                        </div>
                    )
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    secondRowItems.filter((item) => item !== false).map((item, id) =>
                        <div key={id} className="grid gap-8 content-between bg-portal-bg rounded-lg px-4 pt-4 pb-3">
                            <div className="flex items-start justify-between">
                                <span className="text-xs text-grey-dark-2">{item.label}</span>
                                <Icon icon={item.icon} className="size-8 text-grey-dark-3/30" />
                            </div>
                            <h2 className="text-xl text-grey-dark-1">{item.value}</h2>
                        </div>
                    )
                }
                <RenderIf condition={PurchaseModel.Lease === customer?.purchase_model!}>
                    <div className="grid content-center justify-items-center rounded-lg p-2 md:p-0 bg-[#428139] w-full">
                        <div className="grid content-center justify-items-center rounded-full my-auto mx-auto size-32 bg-green-1">
                            <div className="grid gap-1 content-center justify-items-center size-24 bg-dark-green-1 rounded-full text-white" style={{ boxShadow: "0px 0px 14.22px -4.25px rgba(0, 0, 0, 0.39)" }}>
                                <span className="text-3xl">25<sub className="text-base">%</sub></span>
                                <p className="text-[0.625rem]/4">Battery Health</p>
                            </div>
                        </div>
                    </div>
                </RenderIf>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomerServiceRequests />
                <CustomerTotalTrips />
            </div>
            <RenderIf condition={PurchaseModel.Lease === customer?.purchase_model!}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomerTripDetails />
                    <CustomerBatteryDetails />
                </div>
            </RenderIf>
        </motion.div>
    )
}