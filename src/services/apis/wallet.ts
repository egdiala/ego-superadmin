import { GET_WALLET_STATS_API, GET_WALLET_TRANSACTION_API } from "@/constants/api";
import { axiosWalletInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { FetchWalletStatsQuery, FetchWalletTransactionQuery } from "@/types/wallet";

export const getWalletStats = async (query: FetchWalletStatsQuery) => {
  const res = await axiosWalletInstance.get(`${GET_WALLET_STATS_API}${createQueryString(query)}`);
  return res.data;
};

export const getWalletTransactions = async (query: FetchWalletTransactionQuery) => {
  const res = await axiosWalletInstance.get(`${GET_WALLET_TRANSACTION_API}${createQueryString(query)}`);
  return res.data;
};