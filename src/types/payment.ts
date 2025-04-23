export interface FetchLeasePaymentsQuery {
    request_type: "1" | "2" | "3" // 1=Daily Group | 2=Business Group | 3=Individual car
    organization_id?: string;
    vehicle_id?: string;
    status?: "0" | "1" // 0=receiveable | 1=paid
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status" | "dashboard-count" | "export"
}

export interface FetchCommutePaymentsQuery {
    request_type: "1" | "2" | "3" // 1=Daily Group | 2=Vehicle Group | 3=Organization Group
    status?: "0" | "1" | "2" // 0=receiveable | 1=paid
    charge_status?: "0" | "1" // 0=unpaid | 1=paid
    start_date?: string;
    organization_id?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-status" | "export" | "dashboard-count"
}

export interface FetchReconciliationQuery {
    start_date: string;
    end_date: string;
    component?: "count-status" | "export"
}

export interface FetchPayoutQuery {
    status?: "0" | "1" | "2" | "3" // 0=Pending | 1=paid | 2=Failed | 3=Processing
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count-status" | "count" | "export"
}

export type ApprovePayoutType = {
    status?: "1" | "2" // 1=Approve | 2=Reprocess
    payout_id: string;
}

export interface FetchedPayout {
    auth_id: string;
    stakeholder_name: string;
    account_data: {
        account_number: string;
        bank_name: string;
        bank_code: string;
        account_name: string;
        status: boolean;
    };
    start_date: Date | string;
    end_date: Date | string;
    amount: number;
    actual_amount: number;
    wallet_deduction: number;
    user_type: string;
    description: string;
    created: string;
    trials: number;
    status: number;
    approve_status: number;
    source_bank: Record<string, any>
    payment_summary: Record<string, any>
    response_data: Record<string, any>
    createdAt: Date | string;
    updatedAt: Date | string;
    payout_id: string;
}

export interface PayoutStats {
    _id: null;
    total_tax_paid: number;
    total_tax_pending: number;
    total_tech_paid: number;
    total_tech_pending: number;
    total_asset_co_paid: number;
    total_asset_co_pending: number;
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
    createdAt: string;
    total_trip: number;
    total_amount: number;
    total_remitted: number;
}

export interface FetchedCommuteRevenue {
    total_trip: number;
    total_amount: number;
    total_remitted: number;
    createdAt: string;
}

export interface FetchedCommuteRevenueOrg {
    trip_ref: string;
    driver_data: {
        plate_number: string;
        name: string;
    },
    organization_id: string;
    createdAt: Date | string;
    purchase_model: number;
    payment_type: number;
    charge_status: number;
    rider_name: string;
    total_amount: number;
    organization_name: string;
}

export interface SingleLeaseReceivable {
    createdAt: string;
    total_trip: number;
    total_amount: number;
    total_remitted: number;
    organization_id: string;
    organization_name: string;
}

export interface SingleCommuteReceivable {
    createdAt: string;
    total_trip: number;
    total_amount: number;
    total_remitted: number;
    organization_id: string;
    organization_name: string;
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

export interface FetchedLeaseDashboardPayments {
    _id: null;
    total_lease_paid_amount: number;
    total_lease_paid_count: number;
    total_lease_pending_amount: number;
    total_lease_pending_count: number;
}

export interface FetchedCommuteDashboardPayments {
    _id: null;
    total_sc_paid_amount: number;
    total_sc_paid_count: number;
    total_sc_pending_amount: number;
    total_sc_pending_count: number;
}