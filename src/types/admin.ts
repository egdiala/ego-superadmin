export type CreateAdminType = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    role_id: string;
}

export interface FetchedAdminType extends CreateAdminType {
    auth_id: string;
    avatar: string;
    createdAt: Date | string;
    role_data: {
        _id: string;
        name: string;
        data: {
            create: string[]
            delete: string[]
            update: string[]
            view: string[]
        },
        createdAt: Date | string;
        updatedAt: Date | string;
        __v: 0
    }
    status: number;
    updatedAt: Date | string;
    user_type: string;
}

export interface UpdateAdminType extends Partial<CreateAdminType> {
    status: string;
    suspend_reason: string;
    old_password: string;
    new_password: string;
}

export interface FetchedAdminProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    avatar: string;
    user_type: string;
    gender: string;
    status: number;
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    auth_id: string;
}

export interface FetchAdminsQuery {
    q?: string; // Search for plate number
    email?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
}

export interface FetchActivityLogQuery {
    auth_id?: string; // Use to retrieve personalized logs for a user
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count";
}

export interface FetchedActivityLog {
    auth_id: string;
    service: string;
    operation: string;
    body: string;
    data: {
        auth_id: string;
        email: string;
    },
    createdAt: Date | string;
    updatedAt: Date | string;
    user_data: {
        _id: string;
        first_name: string;
        last_name: string;
        email: string;
        avatar: string;
    }
}

export interface FetchedAdminsCount {
    total: number
}