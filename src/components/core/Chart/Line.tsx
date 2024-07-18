import React, { useEffect } from "react"
import { cn } from "@/libs/cn"
import { useAnimate, useInView } from "framer-motion"
import { ResponsiveLine, type LineSvgProps } from "@nivo/line"

/**
 * Line Chart for displaying data. 
 * 
 * Disclaimer 👀... Make sure parent container has a defined height, otherwise height will be 0 and no chart will be rendered.
 */
export const LineChart: React.FC<LineSvgProps & { className: string }> = ({ className, ...props }) => {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope, { once: true })
    
    useEffect(() => {
        if (isInView) {
            const circles = Array.from(document.querySelectorAll("circle")).reverse()
            const enterAnimation = async () => {
                animate("path", { pathLength: [0, 1] }, { duration: 2, ease: "easeOut" });
            }
            circles.forEach((circle, index) => {
                animate(circle, { r: [0, 5.5] }, { duration: 1.8, delay: index * 0.005, ease: "linear" });
            });
            enterAnimation()
        }
    },[animate, isInView, scope])
    return (
        <div ref={scope} className={cn("w-full h-full", className)}>
            <ResponsiveLine {...props} />
        </div>
    )
}