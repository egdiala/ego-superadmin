import React, { Fragment, useCallback, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetRider } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import { DeleteStaffModal, SuspendStaffModal } from "@/components/pages/riders";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/core/Button/Loader";

export const RiderPage: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { data: rider, isFetching } = useGetRider(params?.id as string)
    const [toggleModals, setToggleModals] = useState({
        openDeleteStaffModal: false,
        openSuspendStaffModal: false,
    })

    const toggleSuspendStaff = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openSuspendStaffModal: !toggleModals.openSuspendStaffModal,
        }))
    }, [toggleModals.openSuspendStaffModal])

    const toggleDeleteStaff = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openDeleteStaffModal: !toggleModals.openDeleteStaffModal,
        }))
    }, [toggleModals.openDeleteStaffModal])
    
    const subRoutes = [
        { name: "Profile", link: `/riders/${params?.id as string}/profile` },
        { name: "Trips", link: `/riders/${params?.id as string}/trips` },
        { name: "Wallet", link: `/riders/${params?.id as string}/wallet` },
        { name: "Ratings", link: `/riders/${params?.id as string}/ratings` },
    ]

    useEffect(() => {
        if (!rider?.auth_id && !isFetching) {
        navigate("/riders")
        }
    },[rider?.auth_id, isFetching, navigate])
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "Riders", link: "/riders" }, { label: `${rider?.first_name} ${rider?.last_name}`, link: `/riders/${params?.id as string}/profile` }, { label: subRoutes.filter((item) => item?.link === location.pathname)?.[0]?.name, link: subRoutes.filter((item) => item?.link === location.pathname)?.[0]?.link }]} showBack />
                    <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <h1 className="text-grey-dark-1 font-bold text-xl">{rider?.first_name} {rider?.last_name} <span className="capitalize font-normal">({rider?.gender})</span></h1>
                            <div className="flex items-center gap-2 pb-4 w-full sm:w-auto">
                                <Button type="button" theme="danger" onClick={toggleDeleteStaff} block>
                                    <Icon icon="ph:trash-bold" className="size-4" />
                                    Delete Staff
                                </Button>
                                <Button type="button" theme="primary" onClick={toggleSuspendStaff} block>
                                    <Icon icon="ph:exclamation-mark-bold" className="size-4" />
                                    Suspend Staff
                                </Button>
                            </div>
                        </div>
                        <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full overflow-scroll">
                            {
                            subRoutes.map((route, idx) => 
                            <Fragment key={route.link}>
                                <NavLink to={route.link} className="flex w-full">
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
                    <DeleteStaffModal isOpen={toggleModals.openDeleteStaffModal} staff={rider} close={toggleDeleteStaff} />
                    <SuspendStaffModal isOpen={toggleModals.openSuspendStaffModal} staff={rider} close={toggleSuspendStaff} />
                </motion.div>
            </RenderIf>

            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}