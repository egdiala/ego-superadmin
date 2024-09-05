export interface FetchRatingsQuery {
    user_type?: "rider" | "driver" | "organization"
    auth_id?: string;
    page?: string;
    item_per_page?: string;
    start_date?: string;
    end_date?: string;
    component?: "count" | "count-status" | "count-one";
}

export interface FetchedRating {
    trip_id: string;
    receiver_auth_id: string;
    sender_auth_id: string;
    organization_id: string;
    receiver_user_type: string;
    comment: string;
    rating: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    rating_id: string;
}

export interface FetchedRatingCountStatus {
    _id: null;
    total: number;
    rating: number;
}

export interface FetchedRatingCountOne {
    total: number;
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
}