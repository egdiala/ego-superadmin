import React, { Fragment, useEffect } from "react";
import { cn } from "@/libs/cn";
import { motion } from "framer-motion";
import { RenderIf } from "@/components/core";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";

export const FeesPage: React.FC = () => {  
    const navigate = useNavigate()
    const location = useLocation()
    const subRoutes = [
        { name: "Lease", link: "/fees/lease" },
        { name: "Staff Commute", link: "/fees/staff-commute" },
        { name: "E-hailing", link: "/fees/e-hailing" },
    ]

    useEffect(() => {
        if (location.pathname === "/fees") {
            navigate("/fees/lease")
        }
    },[location.pathname, navigate])

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-3xl">Fees</h1>
            <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full overflow-scroll scrollbar-hide">
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
        </motion.div>
    )
}