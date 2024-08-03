import { useQuery } from "@tanstack/react-query";
import { GET_VEHICLES } from "@/constants/queryKeys";
import { getVehicles } from "@/services/apis/vehicles";

export const useGetVehicles = () => {
  return useQuery({
    queryKey: [GET_VEHICLES],
    queryFn: getVehicles,
    select: (res) => res?.data as any[],
    retry: false,
  });
};