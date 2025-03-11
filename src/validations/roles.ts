import * as Yup from "yup";

export const deleteRoleSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
})

export const createRoleSchema = Yup.object().shape({
    name: Yup.string().required("Role name is required"),
    role_list: Yup.object().shape({
        create: Yup.array().of(Yup.string()),
        read: Yup.array().of(Yup.string()),
        update: Yup.array().of(Yup.string()),
        delete: Yup.array().of(Yup.string())
    }).test(
    "at-least-one-permission",
    "At least one permission must be selected in either create, view, update, or delete",
    (value) => {
      const { create, read, update, delete: del } = value;
      return create!.length > 0 || read!.length > 0 || update!.length > 0 || del!.length > 0;
    }
    ).required()
})