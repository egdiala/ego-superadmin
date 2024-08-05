import type { AxiosProgressEvent } from "axios";

export type CreateDriverType = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    nin: string;
    driver_license: string;
}

export interface FetchedDriverType extends Omit<CreateDriverType, "nin" | "driver_license"> {
    driver_status: number;
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
    vehOrg: {
        vehicle: null | {
            _id: string;
            organization_assigned: boolean;
            plate_number: string;
            car_model: string;
        };
        organization: null
    };
    bank_data: {
        bank_name: string;
        bank_code: string;
        account_number: string;
        account_name: string;
        status: boolean;
    },
    createdAt: Date | string;
    updatedAt: Date | string;
    driver_id: string;
}

export interface BulkUploadDriversParams {
    files: FormData;
    // eslint-disable-next-line no-unused-vars
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}