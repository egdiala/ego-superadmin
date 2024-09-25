export interface FetchLeasePaymentsQuery {
    request_type: "1" | "2" | "3" // 1=Daily Group | 2=Business Group | 3=Individual car
    organization_id?: string;
    status?: "0" | "1" // 0=receiveable | 1=paid
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count"
}

export interface FetchCommutePaymentsQuery {
    request_type: "1" | "2" // 1=Daily Group | 2=Vehicle Group
    status?: "0" | "1" // 0=receiveable | 1=paid
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count"
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

export interface FetchedReceivableCount {
    total: number;
}