import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_ORGANIZATION, GET_ORGANIZATIONS } from "@/constants/queryKeys";
import { getOrganization, getOrganizations } from "@/services/apis/organizations";
import type { FetchedOrgaizationType, FetchedOrganizationCount, FetchedSingleOrganizationType, FetchOrganizationQuery } from "@/types/organizations";

export const useGetOrganizations = (query: FetchOrganizationQuery) => {
  return useQuery({
    queryKey: [GET_ORGANIZATIONS, query],
    queryFn: () => getOrganizations(query),
    select: (res) => res?.data as FetchedOrgaizationType[] | FetchedOrganizationCount,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
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
