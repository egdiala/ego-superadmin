import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { getRider, getRiders } from "@/services/apis/riders";
import { GET_RIDER, GET_RIDERS } from "@/constants/queryKeys";
import type { FetchedRider, FetchedRiderCount, FetchedRiders, FetchRidersQuery } from "@/types/riders";

export const useGetRiders = (query: FetchRidersQuery) => {
  return useQuery({
    queryKey: [GET_RIDERS, query],
    queryFn: () => getRiders(query),
    select: (res) => res?.data as FetchedRiders | FetchedRiderCount,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetRider = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_RIDER],
    queryFn: () => getRider(id),
    select: (res) => res?.data as FetchedRider,
    retry: false,
    refetchOnWindowFocus: false,
  });
};