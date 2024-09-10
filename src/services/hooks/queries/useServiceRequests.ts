import { useQuery } from "@tanstack/react-query";
import { GET_SERVICE_REQUESTS } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getServiceRequests } from "@/services/apis/service-request";
import type { FetchServiceRequestsQuery } from "@/types/service-requests";

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