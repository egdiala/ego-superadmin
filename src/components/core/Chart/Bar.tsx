import React from "react"
import { cn } from "@/libs/cn"
import { ResponsiveBar, type ResponsiveBarSvgProps } from "@nivo/bar"

export const BarChart: React.FC<ResponsiveBarSvgProps<{}> & { className: string; }> = ({ className, ...props }) => {
    return (
        <div className={cn("w-full h-full", className)}>
            <ResponsiveBar {...props}  />
        </div>
    )
}