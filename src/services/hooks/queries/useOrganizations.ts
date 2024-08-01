import { useQuery } from "@tanstack/react-query";
import { GET_ORGANIZATIONS } from "@/constants/queryKeys";
import { getOrganizations } from "@/services/apis/organizations";
import type { FetchedOrgaizationType } from "@/types/organizations";


export const useGetOrganizations = () => {
  return useQuery({
    queryKey: [GET_ORGANIZATIONS],
    queryFn: getOrganizations,
    select: (res) => res?.data as FetchedOrgaizationType[],
    retry: false,
  });
};
