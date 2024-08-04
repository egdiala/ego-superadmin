import { useQuery } from "@tanstack/react-query";
import { GET_VEHICLES } from "@/constants/queryKeys";
import { getVehicles } from "@/services/apis/vehicles";
import { FetchedVehicleType } from "@/types/vehicles";

export const useGetVehicles = () => {
  return useQuery({
    queryKey: [GET_VEHICLES],
    queryFn: getVehicles,
    select: (res) => res?.data as FetchedVehicleType[],
    retry: false,
  });
};