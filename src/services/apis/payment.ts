import { axiosWalletInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import type { FetchCommutePaymentsQuery, FetchLeasePaymentsQuery } from "@/types/payment";
import { GET_COMMUTE_SERVICE_PAYMENT_API, GET_LEASE_SERVICE_PAYMENT_API } from "@/constants/api";

export const getLeasePayments = async (query: FetchLeasePaymentsQuery) => {
  const res = await axiosWalletInstance.get(`${GET_LEASE_SERVICE_PAYMENT_API}${createQueryString(query)}`);
  return res.data;
};

export const getCommutePayments = async (query: FetchCommutePaymentsQuery) => {
  const res = await axiosWalletInstance.get(`${GET_COMMUTE_SERVICE_PAYMENT_API}${createQueryString(query)}`);
  return res.data;
};