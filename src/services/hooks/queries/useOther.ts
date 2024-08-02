import { useQuery } from "@tanstack/react-query";
import { GET_INDUSTRIES } from "@/constants/queryKeys";
import { getIndustries } from "@/services/apis/other";

export const useGetIndustries = () => {
  return useQuery({
    queryKey: [GET_INDUSTRIES],
    queryFn: getIndustries,
    refetchOnWindowFocus: false,
    select: (res) => res?.content as { id: string; label: string; }[],
    retry: false,
  });
};