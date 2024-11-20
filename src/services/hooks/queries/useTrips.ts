import { useQuery } from "@tanstack/react-query";
import { getRanks, getTrip, getTripDataStats, getTrips, reverseGeocode } from "@/services/apis/trips";
import { GET_TRIP, GET_TRIPS, GET_VEHICLE_DISTANCE_FOR_ORG } from "@/constants/queryKeys";
import type { FetchDistanceForOrgQuery, FetchedMonthlyTrip, FetchedOrgMonthlyTrip, FetchedRiderTripCountStatus, FetchedSingleTrip, FetchedTripCountStatus, FetchedTripType, FetchedVehicleDistanceForOrganization, FetchRanksQuery, FetchTripsQuery, ReverseGeocodeQuery } from "@/types/trips";
import { errorToast } from "@/utils/createToast";

export const useGetTrips = (query: FetchTripsQuery) => {
  return useQuery({
    queryKey: [GET_TRIPS, query],
    queryFn: () => getTrips(query),
    select: (res) => res?.data as FetchedTripType[] | FetchedTripCountStatus | FetchedRiderTripCountStatus | FetchedMonthlyTrip[] | FetchedOrgMonthlyTrip[],
    retry: false,
    refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
  });
};

export const useGetTripStats = <T>(query: FetchDistanceForOrgQuery) => {
  return useQuery({
    queryKey: [GET_VEHICLE_DISTANCE_FOR_ORG, query],
    queryFn: () => getTripDataStats(query),
    select: (res) => res?.data as T | FetchedVehicleDistanceForOrganization,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  })
}

export const useGetRanks = <T>(query: FetchRanksQuery) => {
  return useQuery({
    queryKey: [GET_TRIPS, query],
    queryFn: () => getRanks(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useReverseGeocode = (query: ReverseGeocodeQuery) => {
  return useQuery({
    queryKey: [GET_TRIPS, query],
    queryFn: () => reverseGeocode(query),
    select: (res) => res?.data as any,
    retry: false,
    enabled: !!query?.latlng,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};