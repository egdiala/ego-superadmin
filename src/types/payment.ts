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