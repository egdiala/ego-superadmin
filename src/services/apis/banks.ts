import { axiosSettingsInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { GET_BANK_LIST_API, GET_FEE_BANK_LOGS_API } from "@/constants/api";
import type { ConfirmAccountType, CreateFeeBankType, FetchFeeBankQuery } from "@/types/banks";

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

export const confirmAccountInfo = async (data: ConfirmAccountType) => {
  const res = await axiosSettingsInstance.post(GET_BANK_LIST_API, data);
  return res.data;
};

export const deleteFeeBank = async (id: string) => {
  const res = await axiosSettingsInstance.delete(`${GET_FEE_BANK_LOGS_API}/${id}`);
  return res.data;
};