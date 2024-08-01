import { useQuery } from "@tanstack/react-query";
import { getDriver, getDrivers } from "@/services/apis/drivers";
import { GET_DRIVER, GET_DRIVERS } from "@/constants/queryKeys";
import type { FetchedDriverType } from "@/types/drivers";

export const useGetDrivers = () => {
  return useQuery({
    queryKey: [GET_DRIVERS],
    queryFn: getDrivers,
    select: (res) => res?.data as FetchedDriverType[],
    retry: false,
  });
};

export const useGetDriver = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_DRIVER],
    queryFn: () => getDriver(id),
    select: (res) => res?.data as FetchedDriverType,
    retry: false,
  });
};