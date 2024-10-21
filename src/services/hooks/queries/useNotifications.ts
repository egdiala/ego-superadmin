import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_NOTIFICATIONS } from "@/constants/queryKeys";
import { getNotifications } from "@/services/apis/notifications";
import type { FetchNotificationsQuery } from "@/types/notifications";

export const useGetNotifications = <T>(query: FetchNotificationsQuery) => {
  return useQuery({
    queryKey: [GET_NOTIFICATIONS, query],
    queryFn: () => getNotifications(query),
    select: (res) => res?.data as T,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError(error) {
      errorToast(error)
      return false;
    },
  });
};