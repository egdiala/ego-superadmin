export interface FetchLeasePaymentsQuery {
    request_type: "1" | "2" | "3" // 1=Daily Group | 2=Business Group | 3=Individual car
    organization_id?: string;
    status?: "0" | "1" // 0=receiveable | 1=paid
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status" | "dashboard-count"
}

export interface FetchCommutePaymentsQuery {
    request_type: "1" | "2" // 1=Daily Group | 2=Vehicle Group
    status?: "0" | "1" // 0=receiveable | 1=paid
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status"
}

export interface FetchReconciliationQuery {
    start_date: string;
    end_date: string;
    component?: "count-status"
}

export interface FetchPayoutQuery {
    status?: "0" | "1" | "2" | "3" // 0=Pending | 1=paid | 2=Failed | 3=Processing
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count-status" | "count"
}

export type ApprovePayoutType = {
    status?: "1" | "2" // 1=Approve | 2=Reprocess
    payout_id: string;
}

export interface FetchReconciliationTotals {
    _id: null;
    total_amount: number;
    total_count: number;
    total_lease_amount: number;
    total_commute_amount: number;
    total_lease_count: number;
    total_commute_count: number;
}

export interface FetchedReconciliation {
    rev_date: string;
    asset_co: number;
    created: Date | string;
    createdAt: Date | string;
    daily_tax: number;
    data_mode: string;
    rev_month: string;
    rev_year: string;
    split_stage: Record<string, any>
    status: number;
    tech_co: number;
    toll_fee: number;
    total_gross: number;
    total_trip: number;
    trials: number;
    updatedAt: Date | string;
    version: string;
    rev_data: {
        total_lease: number;
        total_staffcom: number;
    }
}

export interface PaymentCountStatus {
    _id: string | null;
    total_amount: number;
    total_count: number;
}

export interface FetchedLeaseReceivable {
    total_invoice: number;
    total_expected: number;
    total_remitted: number;
    created: string;
    total_org: number;
}

export interface FetchedCommuteRevenue {
    total_trip: number;
    total_expected: number;
    total_remitted: number;
    created: string;
}

export interface SingleLeaseReceivable extends Omit<FetchedLeaseReceivable, "total_org"> {
    excess_km: number;
    total_km: number;
    user_orgs: {
        name: string;
        auth_id: string;
    }
}

export interface SingleCommuteReceivable extends Omit<SingleLeaseReceivable, "user_orgs"> {
    vehicle_data: {
        _id: string;
        plate_number: string;
    }
}

export interface SingleLeaseOrg {
    vehicle_id: string;
    status: number;
    total_expected: number;
    total_obligation: number;
    created: string;
    excess_km: number;
    total_km: number;
    plate_number: string;
}

export interface FetchedLeasePayment {
    total_invoice: number;
    total_expected: number;
    created: string;
    excess_km: number;
    total_km: number;
    total_remitted: number;
    user_orgs: {
        name: string;
        auth_id: string;
    }
}

export interface FetchedLeaseVehiclePayment {
    plate_number: string;
    status: number;
    created: string;
    excess_km: number;
    total_km: number;
    total_expected: number;
    total_obligation: number;
    vehicle_id: string;
    organization_id: string;
    user_orgs: {
        name: string;
        auth_id: string;
    },
}

export interface FetchedCommutePayment {
    vehicle_id: string;
    total_trip: number;
    total_expected: number;
    created: string;
    total_remitted: number;
    vehicle_data: {
        _id: string;
        plate_number: string;
    }
    driver_data: {
        _id: string;
        first_name: string;
        last_name: string;
    }
}

export interface FetchedReceivableCount {
    total: number;
}

export interface FetchedDashboardPayments {
    _id: null;
    total_amount: number;
    total_count: number;
    total_lease_amount: number;
    total_commute_amount: number;
    total_lease_count: number;
    total_commute_count: number;
}