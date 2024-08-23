import { axiosInstance } from "../axiosInstance";
import type { FetchDriversQuery, UpdateUserStatusType } from "@/types/drivers";
import { GET_RIDERS_API, UPDATE_DRIVER_STATUS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getRiders = async (query: FetchDriversQuery) => {
  const res = await axiosInstance.get(`${GET_RIDERS_API}${createQueryString(query)}`);
  return res.data;
};

export const getRider = async (id: string) => {
  const res = await axiosInstance.get(`${GET_RIDERS_API}/${id}`);
  return res.data;
};

export const deleteRider = async (id: string) => {
  const res = await axiosInstance.delete(`${GET_RIDERS_API}/${id}`);
  return res.data;
};

export const updateRiderStatus = async (payload: UpdateUserStatusType) => {
  const { auth_id, ...rest } = payload
  const res = await axiosInstance.put(`${UPDATE_DRIVER_STATUS_API}/${auth_id}`, rest);
  return res.data;
};