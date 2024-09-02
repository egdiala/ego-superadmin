import * as Yup from "yup";

export const addNewParameterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    select_value: Yup.string().required("Select a value"),
    amount: Yup.string().required("Amount is required"),
    percentage: Yup.string().required("Percentage is required"),
})