import type { AxiosProgressEvent } from "axios";

export type CreateChargeStationType = {
    station_name: string;
    contact_address: string;
    lga_address: string;
    contact_number: string;
    open_time: string; //HH:MM
    close_time: string; //HH:MM
}

export interface FetchChargeStationsQuery {
    q?: string; // Search for station name
    status?: string;
    page?: string;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    component?: "count" | "export";
}

export interface BulkUploadChargeStationsParams {
    files: FormData;
    // eslint-disable-next-line no-unused-vars
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export interface FetchedChargeStationsCount {
    total: number
}

export interface FetchedChargeStations {
    station_name: string;
    full_address: string;
    lga_address: string;
    contact_number: string;
    opening_time: string;
    closing_time: string;
    status: number;
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    station_id: string;
}