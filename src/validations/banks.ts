import * as Yup from "yup";

export const createBankSchema = Yup.object().shape({
    reference_name: Yup.string().required("Reference Name is required"),
    bank_code: Yup.string().required("Bank Code is required"),
    bank_name: Yup.string().required("Bank Name is required"),
    account_number: Yup.string().required("Account Number is required"),
})