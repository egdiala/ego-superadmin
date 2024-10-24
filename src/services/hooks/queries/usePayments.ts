import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { getCommutePayments, getLeasePayments, getPayouts, getReconciliation } from "@/services/apis/payment";
import { GET_COMMUTE_PAYMENTS, GET_LEASE_PAYMENTS, GET_PAYOUTS, GET_RECONCILIATION } from "@/constants/queryKeys";
import type { FetchCommutePaymentsQuery, FetchLeasePaymentsQuery, FetchPayoutQuery, FetchReconciliationQuery } from "@/types/payment";

export const useGetLeasePayments = <T>(query: FetchLeasePaymentsQuery) => {
  return useQuery({
    queryKey: [GET_LEASE_PAYMENTS, query],
    queryFn: () => getLeasePayments(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetCommutePayments = <T>(query: FetchCommutePaymentsQuery) => {
  return useQuery({
    queryKey: [GET_COMMUTE_PAYMENTS, query],
    queryFn: () => getCommutePayments(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetReconciliation = <T>(query: FetchReconciliationQuery) => {
  return useQuery({
    queryKey: [GET_RECONCILIATION, query],
    queryFn: () => getReconciliation(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetPayouts = <T>(query: FetchPayoutQuery) => {
  return useQuery({
    queryKey: [GET_PAYOUTS, query],
    queryFn: () => getPayouts(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};