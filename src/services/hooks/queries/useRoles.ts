import { useQuery } from "@tanstack/react-query";
import { getRoleLists, getRoles } from "@/services/apis/roles";
import { GET_ROLE_LISTS, GET_ROLES } from "@/constants/queryKeys";
import { FetchedRoleLists } from "@/types/roles";

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
    select: (res) => res?.data as any[],
    retry: false,
  });
};