import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import bronze from "@/assets/bronze.svg";
import blankImg from "@/assets/blank.svg";
import { pageVariants } from "@/constants/animateVariants";

export const RiderProfile: React.FC = () => {
    const gridItems = [
            { label: "Email", value: "example@gmail.com" },
            { label: "Phone Number", value: "0814 5632 783" },
            { label: "NIN", value: "1234567890" },
            { label: "Department", value: "Human Resources" },
            { label: "Average Rating", value: <div className="flex items-center gap-1"><Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />4.7</div> },
            { label: "Supervisor", value: "Femi Babalola" },
        ]
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-2">
            <div className="flex items-center gap-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-10 bg-green-4 p-4 rounded-lg flex-1">
                    <img
                        src={blankImg}
                        className="size-32 rounded-2xl object-cover"
                        alt="user"
                    />
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-8">
                        {
                            gridItems.map((item) =>
                            <div key={item.label} className="grid gap-1 group">
                                <h4 className="text-grey-dark-3 text-sm">{item.label}</h4>
                                <span className="text-grey-dark-1 text-sm capitalize group-first:lowercase">{item.value}</span>
                            </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center max-w-52 py-4 px-12 bg-green-4 rounded-lg">
                    <img src={bronze} />
                    <h2 className="font-bold text-sm text-yellow-0">RIDER</h2>
                </div>
            </div>
            <div className="grid grid-cols-2 pb-6 gap-6">
                <div className="flex flex-col p-4 gap-6">
                    <h2 className="font-semibold text-base text-grey-dark-1">Trip Limit</h2>
                    <div className="flex items-center"></div>
                </div>
            </div>
        </motion.div>
    )
}