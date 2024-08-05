// Auth
export const LOGIN_API = "admin/auths/login"
export const CHANGE_PASSWORD_API = "admin/auths/reset-password"
export const SEND_RESET_PASSWORD_EMAIL_API = "admin/auths/forgot-password"
export const SEND_RESET_PASSWORD_OTP_API = "user/otps/send"
export const CONFIRM_RESET_PASSWORD_OTP_API = "user/otps/confirm"

// Roles
export const GET_ROLE_LISTS_API = "admin/operations/role-lists"
export const CREATE_ROLE_API = "admin/operations/roles"
export const GET_ROLES_API = "admin/operations/roles"

// Admins
export const CREATE_ADMIN_API = "admin/accounts"
export const GET_ADMIN_PROFILE_API = "admin/accounts/profile"

// Drivers
export const CREATE_DRIVER_API = "admin/users"
export const BULK_UPLOAD_DRIVERS_API = "admin/users/bulk-driver-upload"

// Vehicles
export const GET_VEHICLES_API = "admin/vehicles"
export const ASSIGN_VEHICLES_API = "admin/vehicles/assign"

// Organizations
export const GET_ORGANIZATIONS_API = "admin/organizations"

// Other
export const GET_INDUSTRIES_API = "industries"