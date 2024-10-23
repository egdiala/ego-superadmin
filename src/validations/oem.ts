import * as Yup from "yup";

const minimumYear = 1990;
const currentYear = new Date().getFullYear();

export const createOEMSchema = Yup.object().shape({
    oem_name: Yup.string().required("OEM Name is required"),
    model: Yup.string().required("Model is required"),
    year: Yup.number()
        .required("Year of Manufacture is required")
        .min(minimumYear, "Year of Manufacture cannot be before 1990")
        .max(currentYear, "Year of Manufacture cannot be in the future"),
    file: Yup.string().required("Vehicle image is required"),
})