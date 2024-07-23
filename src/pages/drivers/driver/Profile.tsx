import React from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";

export const DriverProfilePage: React.FC = () => {
    const gridItems = [
        { label: "Email", value: "example@gmail.com" },
        { label: "Phone Number", value: "0814 5632 783" },
        { label: "Rating", value: <div className="flex items-center gap-1"><Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />4.7</div> },
        { label: "Gender", value: "Male" },
        { label: "Date of Birth", value: "2nd May, 1990" },
        { label: "State of Origin", value: "Lagos" },
        { label: "Business assigned to", value: "Payroll services" },
    ]
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-2">
            <div className="flex items-center gap-10 bg-green-4 p-4 rounded-lg">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-32 rounded-2xl object-cover" alt="user" />
                <div className="flex-1 grid grid-cols-4 gap-y-8">
                    {
                        gridItems.map((item) =>
                        <div key={item.label} className="grid gap-1">
                            <h4 className="text-grey-dark-3 text-sm">{item.label}</h4>
                            <span className="text-grey-dark-1 text-sm">{item.value}</span>
                        </div>
                        )
                    }
                </div>
            </div>
        </motion.div>
    )
}