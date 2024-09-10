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

export interface FetchedServiceRequestsCount {
    total: number;
}
export interface FetchedServiceRequestsCountStatus extends FetchedServiceRequestsCount {
    total_pending: number;
    total_complete: number;
    total_rejected: number;
}

export interface FetchedServiceRequest {
    organization_id: string;
    driver_id: string;
    vehicle_id: string;
    description: string;
    plate_number: string;
    request_type: number;
    status: number;
    mileage: number;
    comment: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    service_req_id: string;
    driver_data: {
        _id: string;
        first_name: string;
        last_name: string;
    }
}