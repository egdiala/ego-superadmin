import { useQuery } from "@tanstack/react-query";
import { GET_ORGANIZATION, GET_ORGANIZATIONS } from "@/constants/queryKeys";
import { getOrganization, getOrganizations } from "@/services/apis/organizations";
import type { FetchedOrgaizationType, FetchedSingleOrganizationType } from "@/types/organizations";

export const useGetOrganizations = () => {
  return useQuery({
    queryKey: [GET_ORGANIZATIONS],
    queryFn: getOrganizations,
    select: (res) => res?.data as FetchedOrgaizationType[],
    retry: false,
  });
};

export const useGetOrganization = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [GET_ORGANIZATION],
    queryFn: () => getOrganization(id),
    select: (res) => res?.data as FetchedSingleOrganizationType,
    retry: false,
  });
};
