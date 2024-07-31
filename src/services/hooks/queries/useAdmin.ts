import { useQuery } from "@tanstack/react-query";
import { getAdmin, getAdminProfile, getAdmins } from "@/services/apis/admin";
import { GET_ADMIN, GET_ADMIN_PROFILE, GET_ADMINS } from "@/constants/queryKeys";
import { FetchedAdminProfile, FetchedAdminType } from "@/types/admin";

export const useGetAdmins = () => {
  return useQuery({
    queryKey: [GET_ADMINS],
    queryFn: getAdmins,
    select: (res) => res?.data as FetchedAdminType[],
    retry: false,
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