import { useQuery } from "@tanstack/react-query";
import { GET_BANK_LIST, GET_FEE_BANK_LOGS } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getBankList, getFeeBankLogs } from "@/services/apis/banks";
import type { FetchedBankList, FetchFeeBankQuery } from "@/types/banks";

export const useGetBankList = () => {
  return useQuery({
    queryKey: [GET_BANK_LIST],
    queryFn: getBankList,
    select: (res) => res?.data as FetchedBankList[],
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetFeeBanks = <T>(query: FetchFeeBankQuery) => {
  return useQuery({
    queryKey: [GET_FEE_BANK_LOGS, query],
    queryFn: () => getFeeBankLogs(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
}