import type { Coordinate } from "./vehicles";

export interface FetchTripsQuery {
    q?: string; // Search for plate number
    user_type?: "rider" | "driver" | "organization"
    charge_status?: "1" | "2" | "5" // 1=successful, 2=unsuccessful, 5=invalid
    auth_id?: string;
    organization_id?: string;
    page?: string;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    vehicle_id?: string;
    component?: "count" | "count-status" | "count-status-rider" | "count-status-driver" | "count-monthly";
}

export interface FetchRanksQuery {
    request_type?: "trip" | "revenue" | "rating"
    user_type?: "top-vehicles" | "top-driver" | "top-rider"
}

export interface ReverseGeocodeQuery {
    latlng: string;
}

export interface FetchDistanceForOrgQuery {
    organization_id?: string;
    vehicle_id?: string;
    start_date?: string;
    end_date?: string;
    component: "org-dashboard-stat" | "trip-stat";
}

export interface FetchedTripType {
    _id: string;
    trip_ref: string;
    vehicle_id: string;
    driver_id: string;
    charge_at: Date | string;
    driver_data: {
        latitude: number;
        longitude: number;
        driver_id: string;
        avatar: string;
        car_number_plate: string;
        plate_number: string;
        car_model: string;
        rating: number;
        phone_number: string;
        email: string;
        name: string;
    }
    rating_data: {
        _id: string;
        trip_id: string;
        receiver_auth_id: string;
        sender_auth_id: string;
        receiver_user_type: string;
        comment: string;
        rating: 5,
        __v: 0,
        createdAt: Date | string;
        updatedAt: Date | string;
    }
    ride_data: {
        purchase_model: number;
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
    }
    org_data: {
        _id: string;
        name: string;
        purchase_model: number;
    }
    ride_status: string;
    ride_type: string;
    location: {
        origin: {
            type: string;
            coordinates: Coordinate
        }
        destination: {
            type: string;
            coordinates: Coordinate
        }
    }
    google_billable: boolean;
    google_ended: boolean;
    request_area_data: {};
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    __v: number;
    trip_id: string;
}

export interface FetchedTripCountStatus {
    total_count_trip: number;
    total_completed: number;
    total_cancel: number;
    total_accepted: number;
    total_assigned: number;
    total_rejected: number;
}

export interface FetchedRiderTripCountStatus {
    total_count_trip: number;
    total_completed: number;
    total_cancel: number;
    total_count_sch: number;
    total_approved: number;
    total_rejected: number;
}

export interface FetchedOrgMonthlyTrip {
    _id: {
        month: number;
    }
    month: number;
    createdAt: Date | string;
    total: number;
    total_amount: number;
    total_completed: number;
    total_approved?: number;
    total_cancel: number;
}

export interface FetchedMonthlyTrip {
    month: number;
    createdAt: Date | string;
    total_completed: number;
    total_cancel: number;
    total_approved: number;
    total_count: number;
    total?: number;
    total_amount?: number;
}

export interface FetchedVehicleDistanceForOrganization {
    total_amount_paid: number;
    total_amount_outstanding: number;
    total_vehicle: number;
    total_trip_completed: number;
    total_dst_cov: number;
    total_dst_avg: number;
}

export interface FetchedTripDetails {
    total_dst: number;
    total_time: number;
    avg_dist: number;
    time_value: string;
    distance_value: string;
    total_inmotion: number;
    total_idle: number;
}

export interface FetchedSingleTrip {
    trip_ref: string;
    vehicle_id: string;
    driver_id: string;
    driver_data: {
        latitude: number;
        longitude: number;
        driver_id: string;
        avatar: string;
        plate_number: string;
        car_model: string;
        rating: number;
        phone_number: string;
        email: string;
        name: string;
    };
    rating_data: {
        _id: string;
        trip_id: string;
        receiver_auth_id: string;
        sender_auth_id: string;
        receiver_user_type: string;
        comment: string;
        rating: 5,
        __v: 0,
        createdAt: Date | string;
        updatedAt: Date | string;
    }[]
    ride_data: {
        rider_id: string;
        ride_type: string;
        name: string;
        phone_number: string;
        rating: number;
        avatar: string;
        purchase_model: number;
        start_coord: {
            longitude: number;
            latitude: number;
        };
        end_coord: {
            longitude: number;
            latitude: number;
        };
        start_address: string;
        end_address: string;
        dropoff_data: {
            address: string;
            longitude: number;
            latitude: number;
        };
        approval_data: {
            auth_id: string;
            user_type: string;
            name: string;
            created: Date | string;
            requested_at: Date | string;
        };
        assigned_data: {
            auth_id: string;
            name: string;
            user_type: string;
            created: Date | string;
        };
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
        pickup_distance: number;
        status: string;
        stop_location: any[];
        payment_method: string;
        cancel_data: {},
        charge_data: {
            status: string;
            method: string;
        };
        payment_type: number;
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
        };
        picked_at: Date | string;
        drop_off_data: {
            longitude: number;
            latitude: number;
        }
    };
    rider_data: {
        _id: string;
        email: string;
        first_name: string;
        last_name: string;
    };
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
    trip_id: string;
    org_data: {
        _id: string;
        name: string;
        purchase_model: number;
    }
}