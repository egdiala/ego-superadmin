export type CreateVehicleType = {
    plate_no: string;
    model: string;
    year_manufacture: string;
    year_purchase: string;
    vehicle_color: string;
    vehicle_oem: string;
    vehicle_vin: string;
    chassis_no: string;
    engine_no: string;
    vehicle_imei: string;
}

type Coordinate = [number, number];

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
    online: boolean;
    on_trip: string;
    unsuspend_date: string;
    mileage: number;
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
    vehicle_id: string
}

export type AssignVehicleType = {
    auth_id: string;
    vehicle_id: string;
    user_type: "driver" | "organization";
}