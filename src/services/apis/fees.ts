import { axiosSettingsInstance } from "../axiosInstance";
import { GET_FEES_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { CreateFeeType, FetchFeesQuery } from "@/types/fees";

export const getFees = async (query: FetchFeesQuery) => {
  const res = await axiosSettingsInstance.get(`${GET_FEES_API}${createQueryString(query)}`);
  return res.data;
};

export const createFee = async (payload: CreateFeeType) => {
  const res = await axiosSettingsInstance.post(GET_FEES_API, payload);
  return res.data;
};