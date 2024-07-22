export type LoginType = {
    email: string;
    password: string;
}

export type SetPasswordType = {
    email: string;
    old_password: string;
    new_password: string;
}