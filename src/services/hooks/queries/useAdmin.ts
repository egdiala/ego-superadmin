import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { getActivityLogs, getAdmin, getAdminProfile, getAdmins } from "@/services/apis/admin";
import { GET_ACTIVITY_LOGS, GET_ADMIN, GET_ADMIN_PROFILE, GET_ADMINS } from "@/constants/queryKeys";
import type { FetchActivityLogQuery, FetchAdminsQuery, FetchedAdminProfile, FetchedAdminsCount, FetchedAdminType } from "@/types/admin";

export const useGetAdmins = (query: FetchAdminsQuery) => {
  return useQuery({
    queryKey: [GET_ADMINS, query],
    queryFn: () => getAdmins(query),
    select: (res) => res?.data as FetchedAdminType[] | FetchedAdminsCount,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};

export const useGetAdmin = (id: string) => {
  return useQuery({
    queryKey: [GET_ADMIN],
    enabled: !!id,
    queryFn: () => getAdmin(id),
    select: (res) => res?.data as FetchedAdminType,
    retry: false,
  });
};

export const useGetAdminProfile = () => {
  return useQuery({
    queryKey: [GET_ADMIN_PROFILE],
    queryFn: getAdminProfile,
    select: (res) => res?.data as FetchedAdminProfile,
    retry: false,
  });
};

export const useGetActivityLogs = <T>(query: FetchActivityLogQuery) => {
  return useQuery({
    queryKey: [GET_ACTIVITY_LOGS, query],
    queryFn: () => getActivityLogs(query),
    select: (res) => res?.data as T,
    retry: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};