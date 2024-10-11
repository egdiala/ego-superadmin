/* eslint-disable no-unused-vars */
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
    comment: {
        status: number;
        body: string;
        _id: string;
        createdAt: Date | string;
    }[];
    createdAt: Date | string;
    updatedAt: Date | string;
    service_req_id: string;
    driver_data: {
        _id: string;
        first_name: string;
        last_name: string;
    }
}

export enum RequestType {
    Maintenance = 1,
    Repair = 2
}

export enum RequestStatus {
    Pending = 0,
    Scheduled = 1,
    InProgress = 2,
    Completed = 3,
    Rejected = 4
}

export interface SingleServiceRequest extends Omit<FetchedServiceRequest, "driver_data"> {
    data_mode: string;
    driver_data: {
        first_name: string;
        last_name: string;
    };
    img_data: {
        _id: string;
        url: string;
    }[];
    vehicle_data: {
        plate_number: string;
        car_color: string;
        mileage: number;
    };
}

export type UpdateRequestType = {
    id: string;
    status: string;
    comment: string;
}