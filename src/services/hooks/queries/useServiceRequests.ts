import { useQuery } from "@tanstack/react-query";
import { GET_SERVICE_REQUEST, GET_SERVICE_REQUESTS } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getServiceRequest, getServiceRequests } from "@/services/apis/service-request";
import type { FetchServiceRequestsQuery, SingleServiceRequest } from "@/types/service-requests";

export const useGetServiceRequests = <T>(query: FetchServiceRequestsQuery) => {
  return useQuery({
    queryKey: [GET_SERVICE_REQUESTS, query],
    queryFn: () => getServiceRequests(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetServiceRequest = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_SERVICE_REQUEST, id],
    queryFn: () => getServiceRequest(id),
    select: (res) => res?.data as SingleServiceRequest,
    retry: false,
    refetchOnWindowFocus: false,
  });
};