import { useQuery } from "@tanstack/react-query";
import { GET_STATES_BY_COUNTRY } from "@/constants/queryKeys";
import { getStatesByCountry } from "@/services/apis/country";
import type { FetchedStatesByCounty } from "@/types/country";

export const useGetStatesByCountry = () => {
    return useQuery({
        queryKey: [GET_STATES_BY_COUNTRY],
        queryFn: () => getStatesByCountry(),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedStatesByCounty[],
        retry: false,
    });
};