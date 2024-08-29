import { axiosCountryInstance } from "@/services/axiosInstance";
import { COUNTRY_API } from "@/constants/api";

export const getStatesByCountry = async (id: string) => {
  const res = await axiosCountryInstance.get(`${COUNTRY_API}/${id}/states`);
  return res.data;
};