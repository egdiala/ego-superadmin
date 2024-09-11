import { axiosVehicleInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { GET_SERVICE_REQUESTS_API } from "@/constants/api";
import type { FetchServiceRequestsQuery, UpdateRequestType } from "@/types/service-requests";

export const getServiceRequests = async (query: FetchServiceRequestsQuery) => {
  const res = await axiosVehicleInstance.get(`${GET_SERVICE_REQUESTS_API}${createQueryString(query)}`);
  return res.data;
};

export const getServiceRequest = async (id: string) => {
  const res = await axiosVehicleInstance.get(`${GET_SERVICE_REQUESTS_API}/${id}`);
  return res.data;
};

export const updateServiceRequest = async (payload: UpdateRequestType) => {
  const { id, ...rest } = payload
  const res = await axiosVehicleInstance.put(`${GET_SERVICE_REQUESTS_API}/${id}`, rest);
  return res.data;
};