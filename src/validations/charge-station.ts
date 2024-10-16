import * as Yup from "yup";

export const createStationSchema = Yup.object().shape({
    station_name: Yup.string().trim().required("Station name is required"),
    contact_address: Yup.string().trim().required("Full address is required"),
    contact_number: Yup.string().trim().required("Contact number is required"),
    lga_address: Yup.string().trim().required("LGA address is required"),
    open_time: Yup.string().trim().required("Opening hour is required"),
    close_time: Yup.string().trim().required("Closing hour is required"),
})