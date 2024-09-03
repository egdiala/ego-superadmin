import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { LineChart, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";

interface CustomerTotalTripsProps {
    [key: PropertyKey]: any
}

export const CustomerTotalTrips: React.FC<CustomerTotalTripsProps> = ({ className }) => {
    const data = [
        {
            "id": "completed",
            "color": "hsla(93, 100%, 29%, 1)",
            "data": [
            {
                "xFormatted": "January",
                "x": "Jan",
                "y": 17
            },
            {
                "xFormatted": "February",
                "x": "Feb",
                "y": 139
            },
            {
                "xFormatted": "March",
                "x": "Mar",
                "y": 151
            },
            {
                "xFormatted": "April",
                "x": "Apr",
                "y": 227
            },
            {
                "xFormatted": "May",
                "x": "May",
                "y": 150
            },
            {
                "xFormatted": "June",
                "x": "Jun",
                "y": 157
            },
            {
                "xFormatted": "July",
                "x": "Jul",
                "y": 42
            },
            {
                "xFormatted": "August",
                "x": "Aug",
                "y": 69
            },
            {
                "xFormatted": "September",
                "x": "Sep",
                "y": 243
            },
            {
                "xFormatted": "October",
                "x": "Oct",
                "y": 266
            },
            {
                "xFormatted": "November",
                "x": "Nov",
                "y": 122
            },
            {
                "xFormatted": "December",
                "x": "Dec",
                "y": 299
            }
            ]
        },
    ]
    return (
        <div className={cn("flex flex-col p-4 gap-10 rounded-lg border border-[#E1E4E6]", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-3 text-xs">Total Trip Request</h4>
                    <span className="text-grey-dark-1 text-xl">4,535</span>
                </div>
                <TableAction theme="ghost">
                    <Icon icon="mdi:funnel" className="size-4" />
                    Filter
                </TableAction>
            </div>
            <LineChart
                data={data}
                className="w-full h-48 md:h-full"
                margin={{ top: 25, right: 10, bottom: 25, left: 10 }}
                xScale={{ type: "point" }}
                colors={data.map((item) => item.color)}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false
                }}
                tooltip={({ point }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const xFormatted = useMemo(() => {
                        const item = data.find((item) => item.id === point.serieId)
                        return item?.data.find((dataPoint) => dataPoint.x === point.data.x)?.xFormatted
                    }, [point.data.x, point.serieId])
                    
                    const colors = {
                        "completed": "bg-green-1",
                        "approved": "bg-semantics-amber",
                        "cancelled": "bg-semantics-error"
                    }
                    return (
                        <div className="relative bg-grey-dark-1 py-2 px-3.5 flex flex-col gap-1.5 rounded text-white">
                            <span className="text-xs text-yellow-1 text-left">{xFormatted as string} Trips</span> 
                            <div className="flex items-center gap-1">
                                <div className={cn("size-1.5 rounded", colors[point.serieId as keyof typeof colors])} />
                                <span className="font-bold text-xs capitalize">{point.serieId}</span>
                                <span className="text-xs w-16 text-right">{(point.data.y as number).toFixed()}</span> 
                            </div>
                            <div className="size-3 absolute inset-x-full left-[46.3%] -bottom-1 rotate-45 flex items-center justify-center bg-grey-dark-1" />
                        </div>
                    )
                }}
                yFormat=" >-.2f"
                curve="natural"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 10,
                    tickRotation: 0,
                    legend: "",
                    legendOffset: 36,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                }}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                pointSize={10}
                pointColor={{ from: "color", modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={"white"}
                pointLabel="data.yFormatted"
                crosshairType="bottom"
                enableTouchCrosshair={true}
                useMesh={true}
                pointLabelYOffset={-12}
                legends={[]}
            />
        </div>
    )
}