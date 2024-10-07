import * as Yup from "yup";

export const addNewParameterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    amount_sufix: Yup.string().required("Select a value"),
    amount: Yup.string().required("Amount is required"),
})