import * as Yup from "yup";
import { EmailSchema, PasswordSchema } from "./auth";

export const createAdminSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: EmailSchema,
    phone_number: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Select a gender"),
    role_id: Yup.string().required("Select a role"),
})

export const suspendAdminSchema = Yup.object().shape({
    suspend_reason: Yup.string().required("Reason is required"),
})

export const editAdminProfileSchema = Yup.object().shape({
    phone_number: Yup.string().required("Phone number is required"),
})

export const editAdminPasswordSchema = Yup.object().shape({
    old_password: Yup.string().required("Current Password is required"),
    new_password: PasswordSchema,
    confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .required("Confirm New Password is required")
});