import { axiosPaystackInstance, axiosSettingsInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { GET_BANK_LIST_API, GET_FEE_BANK_LOGS_API } from "@/constants/api";
import type { CreateFeeBankType, FetchFeeBankQuery } from "@/types/banks";

export const getBankList = async () => {
  const res = await axiosSettingsInstance.get(GET_BANK_LIST_API);
  return res.data;
};

export const getFeeBankLogs = async (query: FetchFeeBankQuery) => {
  const res = await axiosSettingsInstance.get(`${GET_FEE_BANK_LOGS_API}${createQueryString(query)}`);
  return res.data;
};

export const createFeeBank = async (data: CreateFeeBankType) => {
  const res = await axiosSettingsInstance.post(GET_FEE_BANK_LOGS_API, data);
  return res.data;
};

export const deleteFeeBank = async (id: string) => {
  const res = await axiosSettingsInstance.delete(`${GET_FEE_BANK_LOGS_API}/${id}`);
  return res.data;
};

export const validateBank = async (query: Partial<CreateFeeBankType>) => {
  const res = await axiosPaystackInstance.get(`bank/resolve${createQueryString(query)}`);
  return res.data;
};