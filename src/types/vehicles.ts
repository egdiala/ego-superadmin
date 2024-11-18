import type { AxiosProgressEvent } from "axios";

export type CreateVehicleType = {
    plate_no: string;
    oem_vehicle: string;
    year_manufacture: string;
    year_purchase: string;
    vehicle_color: string;
    oem_id: string;
    vehicle_vin: string;
    chassis_no: string;
    engine_no: string;
    vehicle_imei: string;
}

export type Coordinate = [number, number];

export interface FetchedVehicleType {
    driver_assigned: boolean;
    organization_assigned: boolean;
    plate_number: string;
    car_number: number;
    car_make: string;
    car_model: string;
    car_desc: string;
    car_color: string;
    car_imei: string;
    car_vin: string;
    year_purchase: string;
    year_manufacture: string;
    chassis_number: string;
    engine_number: string;
    qr_code: string;
    status: number;
    location: {
        type: string;
        coordinates: Coordinate
    },
    oem_vehdata: {
        oem_name: string;
        oem_id: string;
        model_name: string;
        model_id: string;
    };
    online: boolean;
    on_trip: string;
    unsuspend_date: string;
    mileage: number;
    org_data: {
        name: string;
        email: string;
        phone_number: string;
        purchase_model: number;
    }
    payment_plan: {
        asset: number;
    },
    repayment_progress: {
        asset: number;
    },
    repayment_limit: {
        asset: number;
    },
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    vehicle_id: string;
    driver_id?: string;
    driver_data?: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
    }
}

export type AssignVehicleType = {
    auth_id: string;
    vehicle_id: string;
    user_type: "driver" | "organization";
}

export interface FetchVehiclesQuery {
    q?: string; // Search for plate number
    driver_id?: string;
    organization_id?: string;
    organization_assigned?: string | boolean;
    driver_assigned?: "0" | "1";
    status?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
}

export interface BulkUploadVehiclesParams {
    files: FormData;
    // eslint-disable-next-line no-unused-vars
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export interface FetchedVehicleCount {
    total: number
}

export interface FetchedVehicleCountStatus {
    total: number
    driver_assigned: number
    org_assigned: number
    active_count: number
}

export interface TopVehiclesType {
    auth_id: string;
    total: number;
    user_data: {
        plate_number: string;
    }
}