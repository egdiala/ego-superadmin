import { useQuery } from "@tanstack/react-query";
import { getFees } from "@/services/apis/fees";
import { errorToast } from "@/utils/createToast";
import { GET_FEES } from "@/constants/queryKeys";
import type { FetchFeesQuery } from "@/types/fees";

export const useGetFees = <T>(query: FetchFeesQuery) => {
  return useQuery({
    queryKey: [GET_FEES, query],
    queryFn: () => getFees(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};