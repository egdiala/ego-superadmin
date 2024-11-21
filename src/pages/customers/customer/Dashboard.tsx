import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { RenderIf } from "@/components/core";
import { useParams } from "react-router-dom";
import { PurchaseModel } from "@/types/organizations";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import type { FetchedOrgMonthlyTrip, FetchedTripDetails, FetchedVehicleDistanceForOrganization } from "@/types/trips";
import { FetchedServiceRequestsCountStatus } from "@/types/service-requests";
import { useGetOrganization, useGetServiceRequests, useGetTrips, useGetTripStats } from "@/services/hooks/queries";
import { CustomerBatteryDetails, CustomerServiceRequests, CustomerTotalPayments, CustomerTotalTrips, CustomerTripDetails } from "@/components/pages/customers";

export const CustomerDashboardPage: React.FC = () => {
    const params = useParams()
    const [tripPaymentsFilter, setTripPaymentsFilter] = useState<{ start_date: string; end_date: string;  }>({ start_date: `${new Date().getFullYear()}-01-01`, end_date: format(new Date(), "yyyy-MM-dd") })
    const [tripStatsFilter, setTripStatsFilter] = useState<{ start_date: string; end_date: string;  }>({ start_date: `${new Date().getFullYear()}-01-01`, end_date: format(new Date(), "yyyy-MM-dd") })
    const [tripDetailsFilter, setTripDetailsFilter] = useState<{ start_date: string; end_date: string;  }>({ start_date: `${new Date().getFullYear()}-01-01`, end_date: format(new Date(), "yyyy-MM-dd") })
    const { data: customer, refetch } = useGetOrganization("")
    const { data: tripDetails, isFetching: fetchingTripDetails } = useGetTripStats<FetchedTripDetails>({ component: "trip-stat", organization_id: params?.id as string, ...tripDetailsFilter })
    const { data: tripStats, isFetching: fetchingTripStats } = useGetTrips({ component: "count-monthly", auth_id: params?.id as string, user_type: "organization", ...tripStatsFilter })
    const { data: tripPayments, isFetching: fetchingTripPayments } = useGetTrips({ component: "count-monthly", charge_status: "1", auth_id: params?.id as string, user_type: "organization", ...tripPaymentsFilter })
    const { data: serviceRequestCount, isFetching: fetchingServiceRequests } = useGetServiceRequests({ component: "count-status", organization_id: params?.id as string })
    const { data: tripStat, isFetching: isFetchingDistance } = useGetTripStats<FetchedVehicleDistanceForOrganization>({ component: "org-dashboard-stat", organization_id: params?.id as string })
    const firstRowItems = [
        (PurchaseModel.StaffCommute === customer?.purchase_model! && ({
            label: "Total Trip Payments",
            value: formattedNumber(tripStat?.total_amount_paid ?? 0)
        })),
        (PurchaseModel.StaffCommute !== customer?.purchase_model! && ({
            label: "Total Amount Paid so far",
            value: formattedNumber(tripStat?.total_amount_paid ?? 0)
        })),
        {
            label: "Total Outstanding Payments",
            value: formattedNumber(tripStat?.total_amount_outstanding ?? 0),
            icon: "mdi:naira"
        },
        (PurchaseModel.StaffCommute !== customer?.purchase_model! && ({
            label: "Total Vehicles Assigned",
            value: tripStat?.total_vehicle,
            icon: "ri:car-fill"
        }))
    ]
    const secondRowItems = [
        {
            label: "Total Completed Trips",
            value: tripStat?.total_trip_completed,
            icon: "bx:trip"
        },
        (PurchaseModel.StaffCommute !== customer?.purchase_model! && ({
            label: "Total Distance Covered by all Vehicles",
            value: `${tripStat?.total_dst_cov.toFixed(2)}km`,
            icon: "ion:speedometer"
        })),
        (PurchaseModel.StaffCommute === customer?.purchase_model! && ({
            label: "Total Distance Covered on Trips",
            value: `${tripStat?.total_dst_cov.toFixed(2)}km`,
            icon: "ion:speedometer"
        })),
        (PurchaseModel.StaffCommute !== customer?.purchase_model! && ({
            label: "Average kilometers covered by the vehicle",
            value: `${tripStat?.total_dst_avg.toFixed(2)}km`,
            icon: "ion:speedometer"
        })),
    ]
    useEffect(() => {
        if (customer === undefined) {
            refetch()
        }
    },[customer, refetch])
    return (
        <Fragment>
            <RenderIf condition={!isFetchingDistance && !fetchingServiceRequests && !fetchingTripPayments}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-6">
                    <div className={cn("grid grid-cols-1 gap-4", PurchaseModel.StaffCommute !== customer?.purchase_model! ? "md:grid-cols-3" : "md:grid-cols-2")}>
                        {
                            [...firstRowItems, ...secondRowItems].filter((item) => item !== false).map((item, id) =>
                                <div key={id} className="grid gap-8 content-between first:bg-green-4 bg-[#FDF2F2] last:bg-portal-bg rounded-lg px-4 pt-4 pb-3">
                                    <div className="flex items-start justify-between">
                                        <span className="text-xs text-grey-dark-2">{item?.label}</span>
                                        <RenderIf condition={!!item?.icon}>
                                            <Icon icon={item.icon as string} className="size-8 text-grey-dark-3/30" />
                                        </RenderIf>
                                    </div>
                                    <h2 className="text-xl text-grey-dark-1">{item.value}</h2>
                                </div>
                            )
                        }
                        <RenderIf condition={PurchaseModel.StaffCommute !== customer?.purchase_model!}>
                            <div className="grid content-center justify-items-center rounded-lg p-2 md:p-0 bg-[#428139] w-full">
                                <div className="grid content-center justify-items-center rounded-full my-auto mx-auto size-32 bg-green-1">
                                    <div className="grid gap-1 content-center justify-items-center size-24 bg-dark-green-1 rounded-full text-white" style={{ boxShadow: "0px 0px 14.22px -4.25px rgba(0, 0, 0, 0.39)" }}>
                                        <span className="text-3xl">0<sub className="text-base">%</sub></span>
                                        <p className="text-[0.625rem]/4 text-center">Average Battery Health</p>
                                    </div>
                                </div>
                            </div>
                        </RenderIf>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <RenderIf condition={PurchaseModel.StaffCommute !== customer?.purchase_model!}>
                            <CustomerServiceRequests data={serviceRequestCount as FetchedServiceRequestsCountStatus} />
                        </RenderIf>
                        <RenderIf condition={PurchaseModel.StaffCommute === customer?.purchase_model!}>
                            <CustomerTotalPayments tripPayment={tripPayments as FetchedOrgMonthlyTrip[]} filters={tripPaymentsFilter} setFilters={setTripPaymentsFilter} isLoading={fetchingTripPayments} />
                        </RenderIf>
                        <CustomerTotalTrips tripData={tripStats as FetchedOrgMonthlyTrip[]} filters={tripStatsFilter} setFilters={setTripStatsFilter} isLoading={fetchingTripStats} />
                    </div>
                    <RenderIf condition={PurchaseModel.Lease === customer?.purchase_model!}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomerTripDetails data={tripDetails as FetchedTripDetails} setFilters={setTripDetailsFilter} isLoading={fetchingTripDetails} />
                            <CustomerBatteryDetails />
                        </div>
                    </RenderIf>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetchingDistance || fetchingServiceRequests || fetchingTripPayments}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}