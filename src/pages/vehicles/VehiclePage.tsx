import React, { Fragment, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetVehicle } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { RevokeDriverModal } from "@/components/pages/vehicles";

export const VehiclePage: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [revokeDriver, setRevokeDriver] = useState(false)
    const { data: vehicle, isFetching } = useGetVehicle(params?.id as string)
  
    const subRoutes = [
        { name: "Profile", link: `/vehicles/${params?.id as string}/profile` },
        { name: "Vehicle Payment", link: `/vehicles/${params?.id as string}/vehicle-payment` },
    ]

    const handlePrimaryAction = () => {
        if (!vehicle?.driver_assigned) {
            navigate(`/vehicles/${params?.id as string}/assign`)
        } else {
            setRevokeDriver(true)
            console.log(revokeDriver)
        }
    }
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "Vehicles", link: "/vehicles" }, { label: `${vehicle?.plate_number}`, link: `/vehicles/${params?.id as string}/profile` }]} showBack />
                    <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <h1 className="text-grey-dark-1 font-bold text-xl">{vehicle?.plate_number}</h1>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Button type="button" theme="primary" onClick={handlePrimaryAction} block>
                                    <Icon icon="tabler:link" className="size-4" />
                                    {vehicle?.driver_assigned ? "Revoke Driver" : "Assign a Driver"}
                                </Button>
                            </div>
                        </div>
                        <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full md:w-1/2 overflow-scroll">
                        {
                            subRoutes.map((route, idx) => 
                            <Fragment>
                            <NavLink key={route.link} to={route.link} className="flex w-full">
                            {({ isActive }) => (
                                <div className={cn("text-center py-1 px-5 flex-1 rounded whitespace-nowrap", isActive ? "bg-green-1 text-white font-semibold text-sm" : "hover:bg-light-green")}>
                                    {route.name}
                                </div>
                            )}
                            </NavLink>
                            <RenderIf condition={(subRoutes.length - 1) !== idx}><hr className="w-14 flex border-input-filled rotate-90" /></RenderIf>
                            </Fragment>
                            )
                        }
                        </div>
                        <Outlet />
                    </div>
                    <RevokeDriverModal vehicleId={vehicle?.vehicle_id!} isOpen={revokeDriver} driver={{ ...vehicle?.driver_data!, driver_id: vehicle?.driver_id! }} close={setRevokeDriver} />
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}