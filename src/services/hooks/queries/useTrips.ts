import { useQuery } from "@tanstack/react-query";
import { getTrip, getTrips, getVehicleDistanceForOrg } from "@/services/apis/trips";
import { GET_TRIP, GET_TRIPS, GET_VEHICLE_DISTANCE_FOR_ORG } from "@/constants/queryKeys";
import type { FetchDistanceForOrgQuery, FetchedSingleTrip, FetchedTripCountStatus, FetchedTripType, FetchedVehicleDistanceForOrganization, FetchTripsQuery } from "@/types/trips";
import { errorToast } from "@/utils/createToast";

export const useGetTrips = (query: FetchTripsQuery) => {
  return useQuery({
    queryKey: [GET_TRIPS, query],
    queryFn: () => getTrips(query),
    select: (res) => res?.data as FetchedTripType[] | FetchedTripCountStatus,
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

export const useGetVehicleDistanceForOrg = (query: FetchDistanceForOrgQuery) => {
  return useQuery({
    queryKey: [GET_VEHICLE_DISTANCE_FOR_ORG, query],
    queryFn: () => getVehicleDistanceForOrg(query),
    select: (res) => res?.data as FetchedVehicleDistanceForOrganization,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  })
}