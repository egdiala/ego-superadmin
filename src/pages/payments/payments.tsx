import React, { Fragment } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { RenderIf, SearchInput, TableAction } from "@/components/core";

export const PaymentLogPage: React.FC = () => {

    const trips = [
        { label: "Amount", value: "₦0", color: "bg-[#F8F9FB]" },
        { label: "Count", value: "0", color: "bg-green-4" },
    ]
  
    const subRoutes = [
        { name: "Lease Model", link: "/payment-log/lease" },
        { name: "Staff Commute Model", link: "/payment-log/staff-commute" },
    ]
  
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
            <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Payment Log</h1>
            <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                    <div className="w-full md:w-1/3 xl:w-1/4">
                        <SearchInput placeholder="Search name, reference etc" />
                    </div>
                
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction type="button" theme="ghost" block>
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                        <TableAction type="button" theme="secondary" block>
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    {
                        trips.map((item) =>
                            <div key={item.label} className={cn("relative grid overflow-hidden content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                                <Icon icon="mdi:naira" className="absolute size-20 -left-4 self-center text-grey-dark-3 text-opacity-10" />
                                <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                                <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                            </div>
                        )
                    }
                </div>
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