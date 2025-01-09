export interface Permission {
    key: string;
    tag: string;
}

export type Actions = "create"|"read"|"update"|"delete"

export type FetchedRoleLists = {
    key: string;
    tag: string;
    action: Actions[]
}

export type CreatePermissionType = {
    name: string;
    role_list: {
        create: string[]
        delete: string[]
        update: string[]
        read: string[]
    }
}

export interface FetchedRolesType {
    name: string;
    data: Record<Actions, string[]>;
    createdAt: string | Date;
    updatedAt: string | Date;
    role_id: string
}

export interface FetchRolesQuery {
    q?: string; // Search for plate number
    email?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "export" | "count-status";
}

export interface FetchedRolesCount {
    total: number
}