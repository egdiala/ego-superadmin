import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const createOrganizationSchema = Yup.object().shape({
    purchase_model: Yup.string().required("Select an EV Purchase Model"),
    email: EmailSchema,
    name: Yup.string().required("Registered Business Name is required"),
    business_id: Yup.string().required("CAC Registration Number is required"),
    industry: Yup.string().required("Select an industry"),
    company_type: Yup.string().required("Select a company type"),
    vehicle_purchase: Yup.string().required("Number of Vehicles Purchased is required"),
    employee_no: Yup.string().required("Number of Employees is required"),
    company_tin: Yup.string().required("Tax Identification Number is required"),
    authorize_rep_name: Yup.string().required("Authorized Rep Name is required"),
    authorize_rep_email: EmailSchema,
    authorize_rep_phone: Yup.string().required("Authorized Rep Phone Number is required"),
})

export const assignVehicleToOrganisationSchema = Yup.object().shape({
    auth_id: Yup.string().required("Select an EV Purchase Model"),
    vehicle_id: Yup.array().of(Yup.string()).min(1, "At least one vehicle must be selected"),
})