import type { AxiosProgressEvent } from "axios";

export type CreateDriverType = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    nin: string;
    driver_license: string;
    dob: string;
    state_origin: string;
}

export interface FetchedDriverType extends Omit<CreateDriverType, "nin" | "driver_license"> {
    driver_status: number;
    assign_status: number;
    nin_id: {
        value: string;
        status: number;
    },
    driver_license_id: {
        value: string;
        status: number;
    },
    status: number;
    avatar: string;
    vehicle_id: string;
    suspension_status: number;
    firebase_token: string;
    org_data: {
        _id: string;
        name: string;
        purchase_model: number;
        status: number;
    }
    vehicle_data: {
        _id: string;
        car_model: string;
        driver_assigned: boolean;
        plate_number: string;
        status: number;
        organization_id: string;
    };
    bank_data: {
        bank_name: string;
        bank_code: string;
        account_number: string;
        account_name: string;
        status: boolean;
    };
    rating?: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    driver_id: string;
}

export interface FetchedDriverCount {
    total: number
    vehOrg: {
        vehicle: null;
        organization: null;
    }
}

export interface FetchedDriverCountStatus {
    total: number;
    assign: number;
    un_assign: number;
    active: number;
    suspended: number;
}

export interface BulkUploadDriversParams {
    files: FormData;
    // eslint-disable-next-line no-unused-vars
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export type UpdateUserStatusType = {
    auth_id: string;
    status: "1" | "2"; // 1=active, 2= suspend
    user_type: "driver" | "rider";
    reason: string;
    suspension_status?: "0" | "1"; // 0=active, 1= suspend
    unsuspend_date?: string;
    unsuspend_time?: string;
    suspend_indefinite: "0" | "1"; // 0=no, 1= yes
}

export interface FetchDriversQuery {
    q?: string; // Search for plate number
    assign_status?: 0 | 1;
    driver_status?: "0" | "1";
    status?: 1 | 2;
    suspension_status?: "0" | "1";
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
}

export interface TopDriversType {
    auth_id: string;
    total: number;
    user_data: {
        first_name: string;
        last_name: string;
        avatar: string;
    }
}