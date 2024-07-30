import * as Yup from "yup";

export const deleteRoleSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
})