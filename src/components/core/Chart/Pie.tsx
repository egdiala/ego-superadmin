import React from "react"
import { cn } from "@/libs/cn"
import { ResponsivePie, type PieSvgProps } from "@nivo/pie"

export const PieChart: React.FC<Omit<PieSvgProps<{}>, "width" | "height"> & { className: string; }> = ({ className, ...props }) => {
    return (
        <div className={cn("w-full h-full", className)}>
            <ResponsivePie {...props}  />
        </div>
    )
}