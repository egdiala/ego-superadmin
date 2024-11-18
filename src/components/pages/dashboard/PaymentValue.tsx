import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import type { FetchedDashboardPayments } from "@/types/payment";
import { formattedNumber } from "@/utils/textFormatter";

interface PaymentValueDashboardProps {
    [key: PropertyKey]: any;
    dues: FetchedDashboardPayments;
    paid: FetchedDashboardPayments;
}

export const PaymentValue: React.FC<PaymentValueDashboardProps> = ({ className, dues, paid }) => {
    const paidAmount = useMemo(() => {
        return [
            { label: "Lease Model", value:`${formattedNumber(paid?.total_lease_amount || 0)} (${paid?.total_lease_count || 0})` },
            { label: "Staff Plan Model", value: `${formattedNumber(paid?.total_commute_amount || 0)} (${paid?.total_commute_count || 0})` },
            { label: "E-hailing Model", value: "₦0 (0)" },
        ]
    },[paid?.total_commute_amount, paid?.total_commute_count, paid?.total_lease_amount, paid?.total_lease_count])
    const paidTotal = useMemo(() => {
        return [
            { label: "Total value of payments", value: formattedNumber(paid?.total_amount || 0) },
            { label: "Volume of payments", value: paid?.total_count },
        ]
    }, [paid?.total_amount, paid?.total_count])
    
    const duesAmount = useMemo(() => {
        return [
            { label: "Lease Model", value:`${formattedNumber(dues?.total_lease_amount || 0)} (${dues?.total_lease_count || 0})` },
            { label: "Staff Plan Model", value: `${formattedNumber(dues?.total_commute_amount || 0)} (${dues?.total_commute_count || 0})` },
            { label: "E-hailing Model", value: "₦0 (0)" },
        ]
    },[dues?.total_commute_amount, dues?.total_commute_count, dues?.total_lease_amount, dues?.total_lease_count])
    const duesTotal = useMemo(() => {
        return [
            { label: "Total value of payments", value: formattedNumber(dues?.total_amount || 0) },
            { label: "Volume of payments", value: dues?.total_count || 0 },
        ]
    },[dues?.total_amount, dues?.total_count])
    return (
        <div className={cn("grid gap-4", className)}>
            <div className="flex flex-col gap-5 p-4 rounded-lg bg-[#55B64821]/[0.13]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    paidTotal.map((item) =>
                    <div key={item.label} className="grid gap-1 w-fit">
                        <h4 className="text-grey-dark-2 text-xs">{item.label} received</h4>
                        <span className="text-grey-dark-1 text-xl font-semibold">{item.value}</span>
                    </div>
                    )
                }
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    paidAmount.map((item) =>
                    <div key={item.label} className="grid gap-1 w-fit">
                        <h4 className="text-grey-dark-2 text-xs">{item.label}</h4>
                        <span className="text-grey-dark-1 text-lg">{item.value}</span>
                    </div>
                    )
                }
                </div>
            </div>
            <div className={cn("flex flex-col gap-5 p-4 rounded-lg bg-light-red")}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    duesTotal.map((item) =>
                    <div key={item.label} className="grid gap-1 w-fit">
                        <h4 className="text-grey-dark-2 text-xs">{item.label} due</h4>
                        <span className="text-grey-dark-1 text-xl font-semibold">{item.value}</span>
                    </div>
                    )
                }
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    duesAmount.map((item) =>
                    <div key={item.label} className="grid gap-1 w-fit">
                        <h4 className="text-grey-dark-2 text-xs">{item.label}</h4>
                        <span className="text-grey-dark-1 text-lg">{item.value}</span>
                    </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}