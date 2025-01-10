import React, { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetVehicle } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteVehicleModal, RevokeDriverModal } from "@/components/pages/vehicles";
import { PurchaseModel } from "@/types/organizations";
import { EditVehicleModal } from "@/components/pages/vehicles/EditVehicleModal";
import { hasPermission, RenderFeature } from "@/hooks/usePermissions";

export const VehiclePage: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [editVehicle, setEditVehicle] = useState(false)
    const [revokeDriver, setRevokeDriver] = useState(false)
    const [deleteVehicle, setDeleteVehicle] = useState(false)
    const { data: vehicle, isFetching } = useGetVehicle(params?.id as string)
  
    const subRoutes = useMemo(() => {
        return [
            { name: "Profile", link: `/vehicles/${params?.id as string}/profile` },
            ((PurchaseModel.Lease) === vehicle?.org_data?.purchase_model! && { name: "Vehicle Payment", link: `/vehicles/${params?.id as string}/vehicle-payment` }),
            { name: "Trips", link: `/vehicles/${params?.id as string}/trips` },
        ].filter((item) => item !== false)
    },[params?.id, vehicle?.org_data?.purchase_model])

    const handlePrimaryAction = () => {
        if (!vehicle?.driver_assigned) {
            navigate(`/vehicles/${params?.id as string}/assign`)
        } else {
            setRevokeDriver(true)
        }
    }

    const handleDeleteVehicle = () => {
        setDeleteVehicle(!deleteVehicle)
    }

    const toggleEditVehicle = () => {
        setEditVehicle(!editVehicle)
    }

    useEffect(() => {
        if ((location?.pathname === `/vehicles/${params?.id as string}/vehicle-payment`) && ((PurchaseModel.Lease) !== vehicle?.org_data?.purchase_model!)) {
            navigate(`/vehicles/${params?.id as string}/profile`)
        }
    },[location?.pathname, params?.id, vehicle?.org_data?.purchase_model])
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "Vehicles", link: "/vehicles" }, { label: `${vehicle?.plate_number}`, link: `/vehicles/${params?.id as string}/profile` }]} showBack />
                    <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <h1 className="text-grey-dark-1 font-bold text-xl">{vehicle?.plate_number}</h1>
                            <RenderIf condition={hasPermission("VEHICLE_DATA", "update") || hasPermission("VEHICLE_DATA", "delete")}>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <RenderFeature module="VEHICLE_DATA" permission="update">
                                        <Button type="button" theme="secondary" onClick={toggleEditVehicle} block>
                                            <Icon icon="ph:pencil-simple-line" className="size-4" />
                                            Edit Vehicle
                                        </Button>
                                    </RenderFeature>
                                    <RenderFeature module="VEHICLE_DATA" permission="delete">
                                        <Button type="button" theme="danger" onClick={handleDeleteVehicle} block>
                                            <Icon icon="tabler:trash" className="size-4" />
                                            Delete Vehicle
                                        </Button>
                                    </RenderFeature>
                                    <RenderFeature module="VEHICLE_DATA" permission="update">
                                        <Button type="button" theme="primary" onClick={handlePrimaryAction} block>
                                            <Icon icon="tabler:link" className="size-4" />
                                            {vehicle?.driver_assigned ? "Revoke Driver" : "Assign a Driver"}
                                        </Button>
                                    </RenderFeature>
                                </div>
                            </RenderIf>
                        </div>
                        <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full md:w-1/2 overflow-scroll scrollbar-hide">
                        {
                            subRoutes.map((route, idx) => 
                            <Fragment>
                            <NavLink key={route.link} to={route.link} className="flex w-full">
                            {({ isActive }) => (
                                <div className={cn("text-center py-1 px-5 flex-1 rounded whitespace-nowrap text-sm", isActive ? "bg-green-1 text-white font-semibold" : "hover:bg-light-green")}>
                                    {route.name}
                                </div>
                            )}
                            </NavLink>
                            <RenderIf condition={(subRoutes.length - 1) !== idx}><div className="h-full rounded w-0 block border-r border-r-input-filled" /></RenderIf>
                            </Fragment>
                            )
                        }
                        </div>
                        <Outlet />
                    </div>
                    <RenderFeature module="VEHICLE_DATA" permission="update">
                        <EditVehicleModal isOpen={editVehicle} vehicle={vehicle!} close={toggleEditVehicle} />
                        <RevokeDriverModal vehicleId={vehicle?.vehicle_id!} isOpen={revokeDriver} driver={{ ...vehicle?.driver_data!, driver_id: vehicle?.driver_id! }} close={setRevokeDriver} />
                    </RenderFeature>
                    <RenderFeature module="VEHICLE_DATA" permission="delete">
                        <DeleteVehicleModal isOpen={deleteVehicle} vehicle={vehicle!} close={handleDeleteVehicle} />
                    </RenderFeature>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}