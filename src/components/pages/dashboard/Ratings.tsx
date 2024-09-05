import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { TableAction } from "@/components/core";
import type { FetchedRatingCountOne } from "@/types/ratings";

interface RatingsDashboardProps {
    data: FetchedRatingCountOne;
    [key: PropertyKey]: any
}

export const Ratings: React.FC<RatingsDashboardProps> = ({ className, data }) => {
    const ratings = [
        { star: "5 stars", value: data?.five },
        { star: "4 stars", value: data?.four },
        { star: "3 stars", value: data?.three },
        { star: "2 stars", value: data?.two },
        { star: "1 star", value: data?.one }
    ]
    const computeWidth = (value: number) => {
        const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0)
        return (value/totalRating) * 100
    }
    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 font-semibold text-xl">Ratings</h1>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Driver
                </TableAction>
            </div>
            <div className="grid gap-4">
                {
                    ratings.map((rating, id) =>
                    <div key={id} className="flex items-center gap-3">
                        <span className="text-sm text-grey-dark-2">{rating.star}</span>
                        <div className="flex-1 h-2 rounded-full bg-green-4">
                            <motion.div className="h-2 rounded-full bg-green-1" initial={{ width: "0%" }} whileInView={{ width: `${computeWidth(rating.value)}%` }} transition={{ ease: "linear", duration: 1 }}  />
                        </div>
                        <span className="text-base text-grey-dark-1">{rating.value}</span>
                    </div>
                    )
                }
            </div>
        </div>
    )
}