import React, { Fragment, useEffect } from "react";
import { cn } from "@/libs/cn";
import { motion } from "framer-motion";
import { RenderIf } from "@/components/core";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";

export const AccountsLayout: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const subRoutes = [
        { name: "Accounts", link: "/accounts/admins" },
        { name: "Roles", link: "/accounts/roles" }
    ]
    useEffect(() => {
        if (location.pathname === "/accounts") {
            return navigate("/accounts/admins")
        }
    },[location.pathname, navigate])
    return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
        <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Accounts</h1>
        <div className="grid content-start gap-4 p-4 bg-white rounded-lg">
            <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full">
                {
                    subRoutes.map((route, idx) => 
                    <Fragment key={route.link}>
                    <NavLink to={route.link} className="flex w-full">
                    {({ isActive }) => (
                        <div className={cn("text-center py-1 flex-1 rounded", isActive ? "bg-green-1 text-white font-semibold text-sm" : "hover:bg-light-green")}>
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
      </motion.div>
    )
}