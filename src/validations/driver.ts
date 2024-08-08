import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const createDriverSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: EmailSchema,
    phone_number: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Select a gender"),
    nin: Yup.string().length(11, "NIN should be 11 digits").required("NIN is required"),
    driver_license: Yup.string().required("Driver license is required"),
})

export const suspendDriverSchema = Yup.object().shape({
    suspend_indefinite: Yup.boolean().required(),
    reason: Yup.string().required("Reason is required"),
    hour: Yup.number()
        .typeError("Hour must be a number")
        .min(0, "Hour must be between 0 and 12")
        .max(12, "Hour must be between 0 and 12")
        .nullable()
        .when("suspend_indefinite", {
            is: (val: boolean) => val === false,
            then: () => Yup.number().required("Hour is required"),
        }),
    mins: Yup.number()
        .typeError("Mins must be a number")
        .min(0, "Mins must be between 0 and 59")
        .max(59, "Mins must be between 0 and 59")
        .nullable()
        .when("suspend_indefinite", {
            is: (val: boolean) => val === false,
            then: () => Yup.number().required("Mins are required"),
        }),
    time_of_day: Yup.string()
        .oneOf(["AM", "PM"], "Time of the day must be either AM or PM")
        .nullable()
        .when("suspend_indefinite", {
            is: (val: boolean) => val === false,
            then: () => Yup.string().required("Time of the day is required"),
        }),
    unsuspend_date: Yup.date()
        .nullable()
        .when("suspend_indefinite", {
            is: (val: boolean) => val === false,
            then: () => Yup.date().min(new Date(), "Re-activation date & time must be in the future").required("Re-activation date & time is required"),
        })
})

export const bulkCreateDriverSchema = Yup.object().shape({
    files: Yup.mixed().required("Select a file to upload").test("fileType", "Only CSV files are allowed", (value) => {
      if (value && value instanceof File) {
        return value.type === "text/csv" || value.name.endsWith(".csv");
      }
      return false;
    }),
})