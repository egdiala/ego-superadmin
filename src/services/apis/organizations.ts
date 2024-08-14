import type { CreateOrganizationType, SuspendOrganizationType } from "@/types/organizations";
import { axiosInstance } from "../axiosInstance";
import { GET_ORGANIZATIONS_API, SUSPEND_ORGANIZATION_API } from "@/constants/api";

export const getOrganizations = async () => {
  const res = await axiosInstance.get(GET_ORGANIZATIONS_API);
  return res.data;
};

export const createOrganization = async (data: CreateOrganizationType) => {
  const res = await axiosInstance.post(GET_ORGANIZATIONS_API, data);
  return res.data;
};

export const editOrganization = async (payload: CreateOrganizationType & { auth_id: string; }) => {
  const { auth_id, ...rest } = payload
  const res = await axiosInstance.put(`${GET_ORGANIZATIONS_API}/${auth_id}`, rest);
  return res.data;
};

export const getOrganization = async (id: string) => {
  const res = await axiosInstance.get(`${GET_ORGANIZATIONS_API}/${id}`);
  return res.data;
};

export const suspendOrganization = async (payload: SuspendOrganizationType) => {
  const { auth_id, ...rest } = payload
  const res = await axiosInstance.put(`${SUSPEND_ORGANIZATION_API}/${auth_id}`, rest);
  return res.data;
};