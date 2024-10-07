import * as Yup from "yup";

export const addNewParameterSchema = Yup.object().shape({
    tag: Yup.string().required("Select a name"),
    amount_type: Yup.string().required("Select a value"),
    amount: Yup.string().required("Amount is required"),
})