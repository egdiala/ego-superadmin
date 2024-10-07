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

export const editFee = async (payload: CreateFeeType & { fee_id: string; }) => {
  const { fee_id, ...rest } = payload
  const res = await axiosSettingsInstance.put(`${GET_FEES_API}/${fee_id}`, rest);
  return res.data;
};

export const deleteFee = async (id: string) => {
  const res = await axiosSettingsInstance.delete(`${GET_FEES_API}/${id}`);
  return res.data;
};