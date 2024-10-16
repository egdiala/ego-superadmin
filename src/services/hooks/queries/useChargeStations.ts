import { useQuery } from "@tanstack/react-query";
import { GET_CHARGE_STATION, GET_CHARGE_STATIONS } from "@/constants/queryKeys";
import { errorToast } from "@/utils/createToast";
import { getChargeStation, getChargeStations } from "@/services/apis/charge-stations";
import { FetchChargeStationsQuery } from "@/types/charge-stations";

export const useGetChargeStations = <T>(query: FetchChargeStationsQuery) => {
  return useQuery({
    queryKey: [GET_CHARGE_STATIONS, query],
    queryFn: () => getChargeStations(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetChargeStation = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_CHARGE_STATION],
    queryFn: () => getChargeStation(id),
    select: (res) => res?.data as any,
    retry: false,
    refetchOnWindowFocus: false,
  });
};