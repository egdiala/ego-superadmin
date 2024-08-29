import { useQuery } from "@tanstack/react-query";
import { GET_STATES_BY_COUNTRY } from "@/constants/queryKeys";
import { getStatesByCountry } from "@/services/apis/country";
import type { FetchedStatesByCounty } from "@/types/country";

export const useGetStatesByCountry = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_STATES_BY_COUNTRY, id],
        queryFn: () => getStatesByCountry(id),
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedStatesByCounty[],
        retry: false,
    });
};