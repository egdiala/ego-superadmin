import { useQuery } from "@tanstack/react-query";
import { GET_WALLET_STATS, GET_WALLET_TRANSACTION } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getWalletStats, getWalletTransactions } from "@/services/apis/wallet";
import type { FetchedWalletStatsCount, FetchedWalletTransaction, FetchedWalletTransactionCount, FetchedWalletTransactionCountStatus, FetchWalletStatsQuery, FetchWalletTransactionQuery } from "@/types/wallet";

export const useGetWalletStats = (query: FetchWalletStatsQuery) => {
  return useQuery({
    queryKey: [GET_WALLET_STATS, query],
    queryFn: () => getWalletStats(query),
    select: (res) => res?.data as FetchedWalletStatsCount,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetWalletTransactions = (query: FetchWalletTransactionQuery) => {
  return useQuery({
    queryKey: [GET_WALLET_TRANSACTION, query],
    queryFn: () => getWalletTransactions(query),
    select: (res) => res?.data as FetchedWalletTransaction[] | FetchedWalletTransactionCount | FetchedWalletTransactionCountStatus,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};