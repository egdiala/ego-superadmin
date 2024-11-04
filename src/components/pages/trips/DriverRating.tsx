import React from "react";
import { Icon } from "@iconify/react";
import type { FetchedSingleTrip } from "@/types/trips";

interface TripDriverRatingProps {
    data: FetchedSingleTrip["rating_data"][0]
}

export const TripDriverRating: React.FC<TripDriverRatingProps> = ({ data }) => {
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <div className="grid gap-0.5">
                    <h2 className="text-sm text-grey-dark-3">Driver was rated</h2>
                    <div className="flex items-center gap-1">
                        <Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />
                        <span className="font-medium text-sm text-grey-dark-1">{data?.rating.toFixed(1) || 0}</span>
                    </div>
                </div>
                <div className="grid gap-1 justify-items-end">
                    <h3 className="text-grey-dark-3 text-sm">Rating ID</h3>
                    <p className="text-grey-dark-1 text-sm">{data?._id || "-"}</p>
                </div>
            </div>
            <div className="grid gap-1">
                <h3 className="text-grey-dark-3 text-sm">Rider's comment about the driver</h3>
                <p className="text-grey-dark-2 text-sm">{data?.comment || "-"}</p>
            </div>
        </div>
    )
}