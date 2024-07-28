export interface Permission {
    key: string;
    tag: string;
}

export type FetchedRoleLists = {
    create: Permission[]
    delete: Permission[]
    update: Permission[]
    view: Permission[]
}

export type CreatePermissionType = {
    name: string;
    role_list: {
        create: string[]
        delete: string[]
        update: string[]
        view: string[]
    }
}