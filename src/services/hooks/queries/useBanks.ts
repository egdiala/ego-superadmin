import { useQuery } from "@tanstack/react-query";
import { GET_BANK_LIST, GET_FEE_BANK_LOGS, VALIDATE_BANK_ACCOUNT } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getBankList, getFeeBankLogs, validateBank } from "@/services/apis/banks";
import type { CreateFeeBankType, FetchedBankList, FetchFeeBankQuery } from "@/types/banks";

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

export const useGetFeeBanks = (query: FetchFeeBankQuery) => {
  return useQuery({
    queryKey: [GET_FEE_BANK_LOGS],
    queryFn: () => getFeeBankLogs(query),
    select: (res) => res?.data as any[],
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useValidateBank = (query: Partial<CreateFeeBankType>) => {
  return useQuery({
    queryKey: [VALIDATE_BANK_ACCOUNT],
    queryFn: () => validateBank(query),
    select: (res) => res?.data as any[],
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};