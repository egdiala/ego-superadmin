import React, { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RenderIf } from "@/components/core";
import { getAdminData } from "@/utils/authUtil";
import type { TopRidersType } from "@/types/riders";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedRatingCountOne } from "@/types/ratings";
import type { FetchedOrganizationCountStatus } from "@/types/organizations";
import type { FetchedDriverCountStatus, TopDriversType } from "@/types/drivers";
import type { FetchedServiceRequestsCountStatus } from "@/types/service-requests";
import type { FetchedVehicleCountStatus, TopVehiclesType } from "@/types/vehicles";
import { useGetDrivers, useGetOrganizations, useGetRanks, useGetRatings, useGetServiceRequests, useGetVehicles } from "@/services/hooks/queries";
import { Customers, DistanceCovered, PaymentValue, Ratings, ServiceRequests, TopCommuters, TopDrivers, TopVehicles, TotalDrivers, TotalTrips, TripDetails, Vehicles } from "@/components/pages/dashboard";

export const DashboardPage: React.FC = () => {
    const adminData = getAdminData()
    const [allLoading, setAllLoading] = useState(true)
    const [ratingsFilter, setRatingsFilter] = useState<{ user_type: "driver" | "rider" | "organization";  }>({ user_type: "driver" })
    const [topDriversFilter, setTopDriversFilter] = useState<{ request_type: "trip" | "revenue";  }>({ request_type: "trip" })
    const [topRidersFilter, setTopRidersFilter] = useState<{ request_type: "trip" | "revenue";  }>({ request_type: "trip" })
    const [topVehiclesFilter, setTopVehiclesFilter] = useState<{ request_type: "trip" | "revenue";  }>({ request_type: "trip" })
    
    const { data: customerCount, isFetching: fetchingCustomers } = useGetOrganizations({ component: "count-status" })
    const { data: vehiclesCount, isFetching: fetchingVehicles } = useGetVehicles({ component: "count-status" })
    const { data: serviceRequestCount, isFetching: fetchingServiceRequests } = useGetServiceRequests<FetchedServiceRequestsCountStatus>({ component: "count-status" })
    const { data: driversCount, isFetching: fetchingDrivers } = useGetDrivers({ component: "count-status" })
    const { data: ratingsCount, isFetching: fetchingRatings } = useGetRatings({ component: "dashboard-stat", auth_id: adminData?.auth_id, ...ratingsFilter })
    const { data: topDrivers, isFetching: fetchingDriverRank } = useGetRanks<TopDriversType[]>({ user_type: "top-driver", ...topDriversFilter })
    const { data: topRiders, isFetching: fetchingRiderRank } = useGetRanks<TopRidersType[]>({ user_type: "top-rider", ...topRidersFilter })
    const { data: topVehicles, isFetching: fetchingVehicleRank } = useGetRanks<TopVehiclesType[]>({ user_type: "top-vehicles", ...topVehiclesFilter })

    const isFetchingAll = useMemo(() => {
        const loadingStates = [fetchingCustomers, fetchingVehicles, fetchingServiceRequests, fetchingDrivers, fetchingRatings, fetchingDriverRank, fetchingRiderRank, fetchingVehicleRank]

        return loadingStates.some((item) => item)
    }, [fetchingCustomers, fetchingDriverRank, fetchingDrivers, fetchingRatings, fetchingRiderRank, fetchingServiceRequests, fetchingVehicleRank, fetchingVehicles])

    useEffect(() => {
        if (!isFetchingAll) {
            setAllLoading(false)
        }
    },[isFetchingAll])
    return (
        <Fragment>
            <RenderIf condition={!allLoading}>
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
                            <TopDrivers filters={topDriversFilter} setFilters={setTopDriversFilter} data={topDrivers as TopDriversType[]} />
                            <TopVehicles filters={topVehiclesFilter} setFilters={setTopVehiclesFilter} data={topVehicles as TopVehiclesType[]} />
                        </div>
                        <div className="grid gap-6 content-start">
                            <ServiceRequests data={serviceRequestCount as FetchedServiceRequestsCountStatus} />
                            <DistanceCovered />
                            <Ratings filters={ratingsFilter} setFilters={setRatingsFilter} data={ratingsCount as FetchedRatingCountOne[]} />
                            <TopCommuters filters={topRidersFilter} setFilters={setTopRidersFilter} data={topRiders as TopRidersType[]} />
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={allLoading}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}