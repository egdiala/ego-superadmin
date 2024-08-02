import { CreateOrganizationType } from "@/types/organizations";
import { axiosInstance } from "../axiosInstance";
import { GET_ORGANIZATIONS_API } from "@/constants/api";

export const getOrganizations = async () => {
  const res = await axiosInstance.get(GET_ORGANIZATIONS_API);
  return res.data;
};

export const createOrganization = async (data: CreateOrganizationType) => {
  const res = await axiosInstance.post(GET_ORGANIZATIONS_API, data);
  return res.data;
};