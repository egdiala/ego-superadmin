import type { Coordinate } from "./vehicles";

export interface FetchTripsQuery {
    q?: string; // Search for plate number
    user_type?: "rider" | "driver" | "organization"
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
}

export interface FetchedTripType {
    _id: string;
    trip_ref: string;
    vehicle_id: string;
    driver_id: string;
    driver_data: {
        latitude: number;
        longitude: number;
        driver_id: string;
        avatar: string;
        car_number_plate: string;
        car_model: string;
        rating: number;
        phone_number: string;
        email: string;
        name: string;
    },
    ride_data: {
        rider_id: string;
        ride_type: string;
        name: string;
        phone_number: string;
        rating: number;
        avatar: string;
        start_coord: {
            longitude: number;
            latitude: number;
        },
        end_coord: {
            longitude: number;
            latitude: number;
        },
        start_address: string;
        end_address: string;
        dropoff_data: {
            address: string;
            longitude: number;
            latitude: number;
        },
        est_dst: number;
        est_time: number;
        min_fare: number;
        max_fare: number;
        gender: string;
        accepted_at: Date | string;
        pickup_time: number;
        arrive_pickup_at: Date | string;
        bill_to: string;
        organization_id: string;
        start_trip_at: Date | string;
        end_trip_at: Date | string;
        waiting_time: number;
        end_time: number;
        total_distance: number;
        end_distance: number;
        journey_type: number;
        stop_location: {
                address: string;
                longitude: number;
                latitude: number;
        }[]
        status: string;
        payment_method: string;
        cancel_data: {},
        charge_data: {
            status: string;
            method: string;
        },
        action: string;
        fare: number;
        amount: number;
        fare_params: {
            BASE_FEE: string;
            TIME_FEE: string;
            DISTANCE_FEE: string;
            WAITING_FEE: string;
            DELAY_FEE: string;
            TAX_FEE: string;
            ALLOWED_WAITING_TIME: string;
            FARE_BEFORE_PROMO: string;
            discount_value: string;
            promo_value: number;
            promo_code: string;
            IS_PROMO: boolean;
            fare_is_minimum: boolean;
            FARE_AFTER_PROMO: string;
            charge_tax: string;
            charge_base: string;
            charge_time: string;
            charge_distance: string;
            charge_waiting: string;
            charge_delay: string;
            charge_toll: string;
            charge_minimum: string;
        },
        picked_at: Date | string;
        drop_off_data: {
            longitude: number;
            latitude: number;
        }
    },
    ride_status: string;
    ride_type: string;
    location: {
        origin: {
            type: string;
            coordinates: Coordinate
        },
        destination: {
            type: string;
            coordinates: Coordinate
        }
    },
    google_billable: boolean;
    google_ended: boolean;
    request_area_data: {},
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    __v: number;
    trip_id: string;
}