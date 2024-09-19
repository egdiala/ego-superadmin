import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { TableAction } from "@/components/core";
import type { FetchedRatingCountOne } from "@/types/ratings";

interface RatingsDashboardProps {
    data: FetchedRatingCountOne[];
    [key: PropertyKey]: any
}

export const Ratings: React.FC<RatingsDashboardProps> = ({ className, data }) => {
    const ratings = useMemo(() => {
        // Initialize a map with all ratings from 1 to 5 set to 0
        const ratingsMap = new Map<number, number>([
            [5, 0],
            [4, 0],
            [3, 0],
            [2, 0],
            [1, 0],
        ]);

        // Update the map with the existing ratings data
        data.forEach(item => {
            ratingsMap.set(item.rating, item.total);
        });

        // Convert the map back into an array of objects
        return Array.from(ratingsMap.entries()).map(([rating, total]) => ({
            rating,
            total,
        }));
    },[data])
    const computeWidth = (value: number) => {
        const totalRating = data.reduce((sum, rating) => sum + rating.total, 0)
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
                        <span className="text-sm text-grey-dark-2">{rating.rating}</span>
                        <div className="flex-1 h-2 rounded-full bg-green-4">
                            <motion.div className="h-2 rounded-full bg-green-1" initial={{ width: "0%" }} whileInView={{ width: `${computeWidth(rating.total)}%` }} transition={{ ease: "linear", duration: 1 }}  />
                        </div>
                        <span className="text-base text-grey-dark-1">{rating.total}</span>
                    </div>
                    )
                }
            </div>
        </div>
    )
}