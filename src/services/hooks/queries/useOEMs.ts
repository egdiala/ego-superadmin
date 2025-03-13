import { useQuery } from "@tanstack/react-query";
import { GET_OEM, GET_OEMS } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getOEM, getOEMs } from "@/services/apis/oem";
import type { FetchedOEMType, FetchOemQuery } from "@/types/oem";

export const useGetOEMs = (query?: FetchOemQuery) => {
  return useQuery({
    queryKey: [GET_OEMS, query],
    queryFn: () => getOEMs(query),
    select: (res) => res?.data as FetchedOEMType[],
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetOEM = (id: string) => {
  return useQuery({
    queryKey: [GET_OEM],
    queryFn: () => getOEM(id),
    select: (res) => res?.data as FetchedOEMType,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};