import React, { Fragment, useEffect } from "react";
import { cn } from "@/libs/cn";
import { motion } from "framer-motion";
import { RenderIf } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export const DisbursementPage: React.FC = () => {  
    const navigate = useNavigate()
    const location = useLocation()  
    const subRoutes = [
        { name: "Overview", link: "/disbursement/overview" },
        { name: "Disbursement Log", link: "/disbursement/logs" },
    ]
    useEffect(() => {
        if (location.pathname === "/disbursement") {
            return navigate("/disbursement/overview")
        }
    },[location.pathname, navigate])

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <div className="grid gap-2">
                <h1 className="text-grey-dark-1 font-bold text-3xl">Disbursement</h1>
                <p className="text-sm text-grey-dark-2 pb-3">This shows all the relevant information on payouts on the CabZero platform</p>
            </div>
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