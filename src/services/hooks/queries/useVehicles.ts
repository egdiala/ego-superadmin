import { useQuery } from "@tanstack/react-query";
import { GET_VEHICLE, GET_VEHICLES } from "@/constants/queryKeys";
import { getVehicle, getVehicles } from "@/services/apis/vehicles";
import type { FetchedVehicleType, FetchVehiclesQuery } from "@/types/vehicles";

export const useGetVehicles = (query: FetchVehiclesQuery) => {
  return useQuery({
    queryKey: [GET_VEHICLES, query],
    queryFn: () => getVehicles(query),
    select: (res) => res?.data as FetchedVehicleType[],
    retry: false,
  });
};

export const useGetVehicle = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_VEHICLE],
    queryFn: () => getVehicle(id),
    select: (res) => res?.data as FetchedVehicleType,
    retry: false,
  });
};