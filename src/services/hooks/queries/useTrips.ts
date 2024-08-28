import { useQuery } from "@tanstack/react-query";
import { getTrip, getTrips } from "@/services/apis/trips";
import { GET_TRIP, GET_TRIPS } from "@/constants/queryKeys";
import type { FetchedSingleTrip, FetchedTripCountStatus, FetchedTripType, FetchTripsQuery } from "@/types/trips";
import { errorToast } from "@/utils/createToast";

export const useGetTrips = (query: FetchTripsQuery) => {
  return useQuery({
    queryKey: [GET_TRIPS, query],
    queryFn: () => getTrips(query),
    select: (res) => res?.data as FetchedTripType[] | FetchedTripCountStatus,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetTrip = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_TRIP],
    queryFn: () => getTrip(id),
    select: (res) => res?.data as FetchedSingleTrip,
    retry: false,
  });
};