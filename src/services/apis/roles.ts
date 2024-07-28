import { CreatePermissionType } from "@/types/roles";
import { axiosSettingsInstance } from "../axiosInstance";
import { CREATE_ROLE_API, GET_ROLE_LISTS_API, GET_ROLES_API } from "@/constants/api";

export const getRoleLists = async () => {
  const res = await axiosSettingsInstance.get(GET_ROLE_LISTS_API);
  return res.data;
};

export const createRole = async (data: CreatePermissionType) => {
  const res = await axiosSettingsInstance.post(CREATE_ROLE_API, data);
  return res.data;
};

export const getRoles = async () => {
  const res = await axiosSettingsInstance.get(GET_ROLES_API);
  return res.data;
};