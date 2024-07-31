import * as Yup from "yup";

export const deleteRoleSchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
})

export const createRoleSchema = Yup.object().shape({
    name: Yup.string().required("Role name is required"),
    role_list: Yup.object().shape({
        create: Yup.array().of(Yup.string()),
        view: Yup.array().of(Yup.string()),
        update: Yup.array().of(Yup.string()),
        delete: Yup.array().of(Yup.string())
    }).test(
    "at-least-one-permission",
    "At least one permission must be selected in either create, view, update, or delete",
    (value) => {
      const { create, view, update, delete: del } = value;
      return create!.length > 0 || view!.length > 0 || update!.length > 0 || del!.length > 0;
    }
    ).required()
})