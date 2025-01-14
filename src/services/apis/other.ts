import { axiosSettingsInstance } from "../axiosInstance";
import { GET_INDUSTRIES_API } from "@/constants/api";

export const getIndustries = async () => {
  const res = await axiosSettingsInstance.get(GET_INDUSTRIES_API);
  return res.data;
};