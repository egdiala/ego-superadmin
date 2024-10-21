import { axiosMessagingInstance } from "../axiosInstance";
import { GET_NOTIFICATIONS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { FetchNotificationsQuery } from "@/types/notifications";

export const getNotifications = async (query: FetchNotificationsQuery) => {
  const res = await axiosMessagingInstance.get(`${GET_NOTIFICATIONS_API}${createQueryString(query)}`);
  return res.data;
};

export const updateNotifications = async () => {
  const res = await axiosMessagingInstance.put(GET_NOTIFICATIONS_API);
  return res.data;
};

export const updateNotification = async (id: string) => {
  const res = await axiosMessagingInstance.put(`${GET_NOTIFICATIONS_API}/${id}`);
  return res.data;
};