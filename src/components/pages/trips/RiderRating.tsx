import React from "react";
import { Icon } from "@iconify/react";

export const TripRiderRating: React.FC = () => {
    return (
        <div className="flex flex-col h-fit gap-6 py-4 px-5 rounded-lg border border-input-filled">
            <div className="flex items-center justify-between">
                <div className="grid gap-0.5">
                    <h2 className="text-sm text-grey-dark-3">Rider was rated</h2>
                    <div className="flex items-center gap-1">
                        <Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />
                        <span className="font-medium text-sm text-grey-dark-1">4.7</span>
                    </div>
                </div>
                <div className="grid gap-1">
                    <h3 className="text-grey-dark-3 text-sm">Rating ID</h3>
                    <p className="text-grey-dark-1 text-sm">39i439HIJD03</p>
                </div>
            </div>
            <div className="grid gap-1">
                <h3 className="text-grey-dark-3 text-sm">Driver's comment about the rider</h3>
                <p className="text-grey-dark-2 text-sm">Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis nulla arcu in semper tortor. Sagittis suspendisse ultricies.Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam </p>
            </div>
        </div>
    )
}