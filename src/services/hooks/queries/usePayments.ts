import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { getCommutePayments, getLeasePayments } from "@/services/apis/payment";
import { GET_COMMUTE_PAYMENTS, GET_LEASE_PAYMENTS } from "@/constants/queryKeys";
import type { FetchCommutePaymentsQuery, FetchLeasePaymentsQuery } from "@/types/payment";

export const useGetLeasePayments = (query: FetchLeasePaymentsQuery) => {
  return useQuery({
    queryKey: [GET_LEASE_PAYMENTS, query],
    queryFn: () => getLeasePayments(query),
    select: (res) => res?.data as any,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetCommutePayments = (query: FetchCommutePaymentsQuery) => {
  return useQuery({
    queryKey: [GET_COMMUTE_PAYMENTS, query],
    queryFn: () => getCommutePayments(query),
    select: (res) => res?.data as any,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};