import * as Yup from "yup";

export const updateServiceRequestSchema = Yup.object().shape({
    status: Yup.string().required("status is required"),
    comment: Yup.string().required("status is required"),
})
