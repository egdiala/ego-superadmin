import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { NavLink, Outlet } from "react-router-dom";
import { Breadcrumb, Button } from "@/components/core";
import { Icon } from "@iconify/react";
import { cn } from "@/libs/cn";

export const DriverPage: React.FC = () => {
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
            <div className="flex items-start justify-between">
                <h1 className="text-grey-dark-1 font-bold text-xl">Ronald Julius</h1>
                <div className="flex items-center gap-2 pb-4">
                    <Button theme="danger">
                        <Icon icon="ph:trash-bold" className="size-4" />
                        Delete Driver
                    </Button>
                    <Button theme="primary">
                        <Icon icon="ph:exclamation-mark-bold" className="size-4" />
                        Suspend Driver
                    </Button>
                </div>
            </div>
            <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full">
                {
                    subRoutes.map((route) => 
                    <Fragment>
                    <NavLink key={route.link} to={route.link} className="flex w-full">
                    {({ isActive }) => (
                        <div className={cn("text-center py-1 flex-1 rounded", isActive ? "bg-green-1 text-white font-semibold text-sm" : "hover:bg-light-green")}>
                            {route.name}
                        </div>
                    )}
                    </NavLink>
                    <hr className="w-20 flex border-input-filled rotate-90" />
                    </Fragment>
                    )
                }
            </div>
            <Outlet />
        </div>
      </motion.div>
    )
}