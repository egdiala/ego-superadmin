import { axiosInstance } from "../axiosInstance";
import { GET_ORGANIZATIONS_API } from "@/constants/api";

export const getOrganizations = async () => {
  const res = await axiosInstance.get(GET_ORGANIZATIONS_API);
  return res.data;
};
