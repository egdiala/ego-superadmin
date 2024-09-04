import React, { Fragment } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import tripCar from "@/assets/trip_car.svg";
import { useParams } from "react-router-dom";
import { useGetTrip } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, RenderIf, TableAction } from "@/components/core";
import { TripDriverAndVehicle, TripDriverRating, TripInfo, TripPayment, TripRequestInfo, TripRider, TripRiderRating, TripSustainabilityMetrics } from "@/components/pages/trips";

export const TripPage: React.FC = () => {
    const params = useParams()
    const { data: trip, isFetching } = useGetTrip(params?.id as string)
    const timeline = [
        {
            label: "Pickup",
            address: {
                name: "Sterling Towers,",
                street: "20 Marina Rd, Lagos Island, Lagos",
                location: "102273, Lagos"
            },
            status: "done"
        },
        {
            label: "Stop 1",
            address: {
                name: "Sterling Towers,",
                street: "20 Marina Rd, Lagos Island, Lagos",
                location: "102273, Lagos"
            },
            status: "ongoing"
        },
        {
            label: "Stop 2",
            address: {
                name: "Sterling Towers,",
                street: "20 Marina Rd, Lagos Island, Lagos",
                location: "102273, Lagos"
            },
            status: "pending"
        },
        {
            label: "Destination",
            address: {
                name: "Sterling Towers,",
                street: "20 Marina Rd, Lagos Island, Lagos",
                location: "102273, Lagos"
            },
            status: "pending"
        }
    ]
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "All Trips", link: "/trips" }, { label: trip?.trip_ref as string, link: `/trips/${params?.id as string}/profile` }]} showBack />
                    <div className="grid content-start gap-5 p-4 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="text-grey-dark-1 font-bold text-xl">Trip {trip?.trip_ref}</h1>
                            <div className="flex items-center gap-2 pb-4 w-full sm:w-auto">
                                <TableAction theme="ghost" block>
                                    <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                                    Export
                                </TableAction>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-4 py-4 px-5 bg-green-4 rounded-lg">
                                {
                                    timeline.map((item, idx) =>
                                    <div key={idx} className="grid pr-0.5">
                                        <span className="text-dark-green-1 text-xs mb-2.5">{item.label}</span>
                                        <div className="relative flex items-center gap-0.5">
                                            <div className={cn("grid place-content-center size-5 rounded-full", item.status === "pending" ? "bg-grey-dark-3" : "bg-green-1")}>
                                                <Icon icon={item.status === "done" ? "radix-icons:check" : "carbon:dot-mark"} className="text-white size-4" />
                                            </div>
                                            <RenderIf condition={(timeline.length - 1) !== idx}>
                                                <div className="relative flex flex-1">
                                                    <div className={cn("absolute flex items-center p-0.5 rounded bg-green-1 z-10 -mt-[1px]", item.status === "ongoing" && "w-1/2", item.status === "done" && "w-full", item.status === "pending" && "w-0 p-0")} />
                                                    <div className="relative bg-grey-dark-3 left-0 right-0 p-px flex-1 rounded" />
                                                    <RenderIf condition={item.status === "ongoing"}>
                                                        <img src={tripCar} className="w-14 h-6 absolute my-auto mx-auto inset-0" alt="trip_Car" />
                                                    </RenderIf>
                                                </div>
                                            </RenderIf>
                                        </div>
                                        <div className="mt-3.5">
                                            <span className="text-sm font-medium text-grey-dark-1">{item.address.name}</span>
                                            <p className="text-xs stext-grey-dark-2">{item.address.street} <br />{item.address.location}</p>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-6 content-start">
                                    <TripRequestInfo data={trip!} />
                                    <TripInfo data={trip!} />
                                    <TripPayment data={trip!} />
                                    <TripDriverRating />
                                    <TripRiderRating />
                                </div>
                                <div className="grid gap-6 content-start">
                                    <TripRider data={trip!} />
                                    <TripDriverAndVehicle data={trip?.driver_data} />
                                    <TripSustainabilityMetrics />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}