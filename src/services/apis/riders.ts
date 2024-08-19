import { axiosInstance } from "../axiosInstance";
import type { FetchDriversQuery } from "@/types/drivers";
import { GET_RIDERS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getRiders = async (query: FetchDriversQuery) => {
  const res = await axiosInstance.get(`${GET_RIDERS_API}${createQueryString(query)}`);
  return res.data;
};

export const getRider = async (id: string) => {
  const res = await axiosInstance.get(`${GET_RIDERS_API}/${id}`);
  return res.data;
};