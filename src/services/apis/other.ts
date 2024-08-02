import { otherInstance } from "../axiosInstance";
import { GET_INDUSTRIES_API } from "@/constants/api";

export const getIndustries = async () => {
  const res = await otherInstance.get(GET_INDUSTRIES_API);
  return res.data;
};