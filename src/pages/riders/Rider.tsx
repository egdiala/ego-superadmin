import React, { Fragment, useCallback, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import { DeleteStaffModal, SuspendStaffModal } from "@/components/pages/riders";

export const RiderPage: React.FC = () => {
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
        { name: "Profile", link: "/riders/1/profile" },
        { name: "Trips", link: "/riders/1/trips" },
        { name: "Wallet", link: "/riders/1/wallet" },
        { name: "Ratings", link: "/riders/1/ratings" },
    ]
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <Breadcrumb items={[{ label: "Riders", link: "/riders" }, { label: "Ronald Julius", link: "/riders/1/profile" }, { label: "Profile", link: "/riders/1/profile" }]} showBack />
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <h1 className="text-grey-dark-1 font-bold text-xl">Ronald Julius (Female)</h1>
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
            <DeleteStaffModal isOpen={toggleModals.openDeleteStaffModal} close={toggleDeleteStaff} />
            <SuspendStaffModal isOpen={toggleModals.openSuspendStaffModal} close={toggleSuspendStaff} />
        </motion.div>
    )
}