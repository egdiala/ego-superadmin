export type LoginType = {
    email: string;
    password: string;
}

export type SetPasswordType = {
    otp: string;
    new_password: string;
    otp_request_id: string;
}

export type SendResendPasswordOTPType = {
    otp_mode?: string;
    otp_request_id: string;
}

export type ConfirmResendPasswordOTPType = {
    otp: string;
    otp_request_id: string;
}