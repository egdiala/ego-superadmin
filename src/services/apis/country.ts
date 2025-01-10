import { axiosSettingsInstance } from "@/services/axiosInstance";
import { COUNTRY_API } from "@/constants/api";

export const getStatesByCountry = async () => {
  const res = await axiosSettingsInstance.get(COUNTRY_API);
  return res.data;
};