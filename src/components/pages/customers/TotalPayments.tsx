import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import { LineChart, TableAction } from "@/components/core";
import { Icon } from "@iconify/react";
import type { FetchedOrgMonthlyTrip } from "@/types/trips";
import { formattedNumber } from "@/utils/textFormatter";

interface CustomerTotalPaymentsProps {
    [key: PropertyKey]: any
    tripPayment: FetchedOrgMonthlyTrip[]
}

const months = [
  { x: "Jan", xFormatted: "January" },
  { x: "Feb", xFormatted: "February" },
  { x: "Mar", xFormatted: "March" },
  { x: "Apr", xFormatted: "April" },
  { x: "May", xFormatted: "May" },
  { x: "Jun", xFormatted: "June" },
  { x: "Jul", xFormatted: "July" },
  { x: "Aug", xFormatted: "August" },
  { x: "Sep", xFormatted: "September" },
  { x: "Oct", xFormatted: "October" },
  { x: "Nov", xFormatted: "November" },
  { x: "Dec", xFormatted: "December" }
];

export const CustomerTotalPayments: React.FC<CustomerTotalPaymentsProps> = ({ className, tripPayment }) => {
    const data = useMemo(() => {
        // Initialize arrays for completed, approved, and canceled trips
        const formattedData = {
            completed: [] as { xFormatted: string; x: string; y: number; value: number; }[],
            approved: [] as { xFormatted: string; x: string; y: number; value: number; }[],
            cancelled: [] as { xFormatted: string; x: string; y: number; value: number; }[]
        };

        const tripDataMap = new Map(tripPayment?.map(trip => [trip?.month, trip]));

        // Iterate over all months and ensure data exists for each month
        months.forEach((month, index) => {
            const monthIndex = index + 1; // Month starts from 1 (January = 1, February = 2, etc.)
            const monthData = tripPayment?.find((item) => item?.month === monthIndex)
            // Get the trip data for the current month or use default values if not found
            const trip = tripDataMap?.get(monthIndex) || {
                total_completed: 0,
                total_cancel: 0,
                total_approved: 0,
            };

            // Push data into the respective arrays
            formattedData?.completed?.push({
                xFormatted: month?.xFormatted,
                x: month?.x,
                y: trip?.total_completed,
                value: monthData?.total_amount as number
            });
            formattedData?.approved?.push({
                xFormatted: month?.xFormatted,
                x: month?.x,
                y: trip?.total_approved || 0,
                value: monthData?.total_amount as number
            });
            formattedData?.cancelled?.push({
                xFormatted: month?.xFormatted,
                x: month?.x,
                y: trip?.total_cancel,
                value: monthData?.total_amount as number
            });
        });

        return [
            {
                id: "completed",
                color: "hsla(93, 100%, 29%, 1)",
                data: formattedData?.completed
            },
            // {
            //     id: "approved",
            //     color: "hsla(41, 100%, 44%, 1)",
            //     data: formattedData?.approved
            // },
            // {
            //     id: "cancelled",
            //     color: "hsla(4, 80%, 48%, 1)",
            //     data: formattedData?.cancelled
            // }
        ]
    },[tripPayment])
    return (
        <div className={cn("flex flex-col p-4 gap-10 rounded-lg border border-[#E1E4E6] min-h-96", className)}>
            <div className="flex items-start justify-between">
                <div className="p-2 grid gap-1 bg-portal-bg rounded-lg w-fit">
                    <h4 className="text-grey-dark-3 text-xs">Total Trip Payments</h4>
                    <span className="text-grey-dark-1 text-xl">0</span>
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
                        "successful": "bg-green-1",
                        "unsuccessful": "bg-semantics-error"
                    }
                    return (
                        <div className="relative bg-grey-dark-1 py-2 px-3.5 flex flex-col gap-1.5 rounded text-white">
                            <span className="text-xs text-yellow-1 text-left">{xFormatted as string} Trips</span> 
                            <div className="flex items-center gap-1">
                                <div className={cn("size-1.5 rounded", colors[point.serieId as keyof typeof colors])} />
                                <span className="font-bold text-xs capitalize">{point.serieId}</span>
                                <span className="text-xs w-16 text-right">{formattedNumber((point.data as any).value as number)}</span> 
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