export interface FetchServiceRequestsQuery {
    q?: string; // Search for plate number
    driver_id?: string;
    organization_id?: string;
    page?: string;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    component?: "count" | "export" | "count-status";
}

export interface FetchedServiceRequestsCountStatus {
    total: number;
    total_pending: number;
    total_complete: number;
    total_rejected: number;
}