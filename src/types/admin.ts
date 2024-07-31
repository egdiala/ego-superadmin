export type CreateAdminType = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    role_id: string;
}

export interface FetchedAdminType extends Omit<CreateAdminType, "gender" | "role_id"> {
    avatar: string;
    status: number;
    auth_id: string;
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