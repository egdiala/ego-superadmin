import * as Yup from "yup";

const minimumYear = 1990;
const currentYear = new Date().getFullYear();

export const createVehicleSchema = Yup.object().shape({
    plate_no: Yup.string().required("Plate Number is required"),
    model: Yup.string().required("Model is required"),
    year_manufacture: Yup.number()
        .required("Year of Manufacture is required")
        .min(minimumYear, "Year of Manufacture cannot be before 1990")
        .max(currentYear, "Year of Manufacture cannot be in the future"),
    year_purchase: Yup.number()
        .required("Purchase Year is required")
        .min(minimumYear, "Purchase Year cannot be before 1990")
        .max(currentYear, "Purchase Year cannot be in the future"),
    vehicle_color: Yup.string().required("Vehicle color is required"),
    vehicle_oem: Yup.string().required("OEM is required"),
    vehicle_vin: Yup.string().required("Vehicle Identification Number is required"),
    chassis_no: Yup.string().required("Chassis Number is required"),
    engine_no: Yup.string().required("Engine Number is required"),
    vehicle_imei: Yup.string().required("Dashcam IMEI is required"),
})

export const revokeDriverSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
})