import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedRatingCountOne } from "@/types/ratings";
import type { FetchedDriverCountStatus } from "@/types/drivers";
import type { FetchedVehicleCountStatus } from "@/types/vehicles";
import type { FetchedOrganizationCountStatus } from "@/types/organizations";
import type { FetchedServiceRequestsCountStatus } from "@/types/service-requests";
import { useGetDrivers, useGetOrganizations, useGetRatings, useGetServiceRequests, useGetVehicles } from "@/services/hooks/queries";
import { Customers, DistanceCovered, PaymentValue, Ratings, ServiceRequests, TopCommuters, TopDrivers, TopVehicles, TotalDrivers, TotalTrips, TripDetails, Vehicles } from "@/components/pages/dashboard";

export const DashboardPage: React.FC = () => {
    const { data: customerCount, isFetching: fetchingCustomers } = useGetOrganizations({ component: "count-status" })
    const { data: vehiclesCount, isFetching: fetchingVehicles } = useGetVehicles({ component: "count-status" })
    const { data: serviceRequestCount, isFetching: fetchingServiceRequests } = useGetServiceRequests({ component: "count-status" })
    const { data: driversCount, isFetching: fetchingDrivers } = useGetDrivers({ component: "count-status" })
    const { data: ratingsCount, isFetching: fetchingRatings } = useGetRatings({ component: "count-one" })
    return (
        <Fragment>
            <RenderIf condition={!fetchingCustomers && !fetchingVehicles && !fetchingServiceRequests && !fetchingDrivers && !fetchingRatings}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Dashboard</h1>
                    <div className="grid gap-6">
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                            <Customers data={customerCount as FetchedOrganizationCountStatus} />
                            <PaymentValue className="xl:col-span-3" />
                        </div>
                    </div>
                    <div className="grid gap-6 xl:grid-cols-7">
                        <TotalTrips className="xl:col-span-4" />
                        <Vehicles data={vehiclesCount as FetchedVehicleCountStatus} className="xl:col-span-3" />
                    </div>
                    <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
                        <div className="grid gap-6 content-start">
                            <TripDetails />
                            <TotalDrivers data={driversCount as FetchedDriverCountStatus} />
                            <TopDrivers />
                            <TopVehicles />
                        </div>
                        <div className="grid gap-6 content-start">
                            <ServiceRequests data={serviceRequestCount as FetchedServiceRequestsCountStatus} />
                            <DistanceCovered />
                            <Ratings data={ratingsCount as FetchedRatingCountOne} />
                            <TopCommuters />
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={fetchingCustomers || fetchingVehicles || fetchingServiceRequests || fetchingDrivers || fetchingRatings}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}