export interface FetchedRider {
    organization_id: string;
    department_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    account_type: string;
    nin_id: {
        value: string;
        status: number;
    },
    gender: string;
    status: number;
    indefinte_suspension: boolean;
    unsuspend_date: string;
    unsuspend_time: string;
    avatar: string;
    free_trip_limit: number;
    spend_limit: number;
    spend_duration: string;
    trip_duration: string;
    firebase_token: string;
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    auth_id: string;
    department_data?: {
        name: string;
    }
    org_data: {
        name: string;
    }
    ride_data?: {
        total: 1
    }
}

export interface FetchedRiderCount {
    total: number
}

export interface FetchedRiders {
    department_info: null;
    user_info: FetchedRider[]
}

export interface FetchRidersQuery {
    q?: string; // Search for plate number
    assign_status?: 0 | 1;
    driver_status?: "0" | "1";
    status?: 1 | 2;
    suspension_status?: "0" | "1";
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
    organization_id?: string;
}