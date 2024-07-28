import React, { Fragment, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { NavLink, Outlet } from "react-router-dom";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import { Icon } from "@iconify/react";
import { cn } from "@/libs/cn";
import { DeleteDriverModal, SuspendDriverModal } from "@/components/pages/drivers";

export const DriverPage: React.FC = () => {
    const [toggleModals, setToggleModals] = useState({
        openDeleteDriverModal: false,
        openSuspendDriverModal: false,
    })
  
    const toggleSuspendDriver = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openSuspendDriverModal: !toggleModals.openSuspendDriverModal,
      }))
    }, [toggleModals.openSuspendDriverModal])
  
    const toggleDeleteDriver = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteDriverModal: !toggleModals.openDeleteDriverModal,
      }))
    }, [toggleModals.openDeleteDriverModal])
    
    const subRoutes = [
        { name: "Profile", link: "/drivers/3/profile" },
        { name: "Trips", link: "/drivers/3/trips" },
        { name: "Driver Payment", link: "/drivers/3/driver-payment" },
        { name: "Ratings", link: "/drivers/3/ratings" },
    ]
    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
        <Breadcrumb items={[{ label: "All Drivers", link: "/drivers" }, { label: "Ronald Julius", link: "/drivers/3/profile" }]} showBack />
        <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <h1 className="text-grey-dark-1 font-bold text-xl">Ronald Julius</h1>
                <div className="flex items-center gap-2 pb-4 w-full sm:w-auto">
                    <Button type="button" theme="danger" onClick={toggleDeleteDriver} block>
                        <Icon icon="ph:trash-bold" className="size-4" />
                        Delete Driver
                    </Button>
                    <Button type="button" theme="primary" onClick={toggleSuspendDriver} block>
                        <Icon icon="ph:exclamation-mark-bold" className="size-4" />
                        Suspend Driver
                    </Button>
                </div>
            </div>
            <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full overflow-scroll">
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
                    <RenderIf condition={(subRoutes.length - 1) !== idx}><hr className="w-20 flex border-input-filled rotate-90" /></RenderIf>
                    </Fragment>
                    )
                }
            </div>
            <Outlet />
        </div>
        <DeleteDriverModal isOpen={toggleModals.openDeleteDriverModal} close={toggleDeleteDriver} />
        <SuspendDriverModal isOpen={toggleModals.openSuspendDriverModal} close={toggleSuspendDriver} />
      </motion.div>
    )
}