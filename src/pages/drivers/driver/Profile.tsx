import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import whiteCar from "@/assets/white_car.svg";
import { pageVariants } from "@/constants/animateVariants";

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
            <div className="flex flex-col gap-6 w-full border border-grey-dark-4 rounded-lg py-4 px-5">
                <h2 className="font-semibold text-base text-grey-dark-1">ID & Vehicle Info</h2>
                <div className="grid grid-cols-5">
                    <div className="grid gap-1">
                        <h4 className="text-grey-dark-3 text-sm">NIN</h4>
                        <span className="text-grey-dark-1 text-sm">12345632783</span>
                    </div>
                    <div className="grid gap-1">
                        <h4 className="text-grey-dark-3 text-sm">Driver’s License No.</h4>
                        <span className="text-grey-dark-1 text-sm">12345632783</span>
                    </div>
                    <div className="grid gap-1">
                        <h4 className="text-grey-dark-3 text-sm">Vehicle Assignment Status</h4>
                        <div className="text-white text-sm px-2 py-0.5 bg-green-1 rounded w-fit">Assigned</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={whiteCar} alt="vehicle" className="object-cover object-center w-12" />
                        <div className="grid gap-1">
                            <h4 className="text-grey-dark-1 fon-medium text-sm">ABC123DEF</h4>
                            <span className="text-grey-dark-2 text-sm">GS3 Sedan</span>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <h4 className="text-grey-dark-3 text-sm">Model</h4>
                        <span className="text-grey-dark-1 text-sm">Lease</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}