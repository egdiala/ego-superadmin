import { useQuery } from "@tanstack/react-query";
import { getRole, getRoleLists, getRoles } from "@/services/apis/roles";
import { GET_ROLE, GET_ROLE_LISTS, GET_ROLES } from "@/constants/queryKeys";
import type { FetchedRoleLists, FetchedRolesType } from "@/types/roles";

export const useGetRoleLists = () => {
  return useQuery({
    queryKey: [GET_ROLE_LISTS],
    queryFn: getRoleLists,
    select: (res) => res?.data as FetchedRoleLists,
    retry: false,
  });
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: [GET_ROLES],
    queryFn: getRoles,
    select: (res) => res?.data as FetchedRolesType[],
    retry: false,
  });
};

export const useGetRole = (id: string) => {
  return useQuery({
    queryKey: [GET_ROLE],
    queryFn: () => getRole(id),
    select: (res) => res?.data as FetchedRolesType,
    retry: false,
  });
};