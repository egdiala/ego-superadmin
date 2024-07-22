import React from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Customers, DistanceCovered, PaymentValue, Ratings, ServiceRequests, TopCommuters, TopDrivers, TopVehicles, TotalDrivers, TotalTrips, TripDetails, Vehicles } from "@/components/pages/dashboard";

export const DashboardPage: React.FC = () => {
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Dashboard</h1>
            <div className="grid gap-6">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    <Customers />
                    <PaymentValue className="xl:col-span-3" />
                </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-7">
                <TotalTrips className="xl:col-span-4" />
                <Vehicles className="xl:col-span-3" />
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
                <TripDetails />
                <ServiceRequests />
            </div>
            <div className="grid gap-6 xl:grid-cols-7">
                <TotalDrivers className="xl:col-span-3" />
                <DistanceCovered className="xl:col-span-4" />
            </div>
            <div className="grid gap-6 xl:grid-cols-7">
                <TopDrivers className="xl:col-span-4" />
                <Ratings className="xl:col-span-3" />
            </div>
            <div className="grid gap-6 xl:grid-cols-7">
                <TopVehicles className="xl:col-span-3" />
                <TopCommuters className="xl:col-span-4" />
            </div>
        </motion.div>
    )
}