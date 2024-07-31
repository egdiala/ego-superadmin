import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "@/services/apis/drivers";
import { GET_DRIVERS } from "@/constants/queryKeys";
import type { FetchedDriverType } from "@/types/drivers";


export const useGetDrivers = () => {
  return useQuery({
    queryKey: [GET_DRIVERS],
    queryFn: getDrivers,
    select: (res) => res?.data as FetchedDriverType[],
    retry: false,
  });
};