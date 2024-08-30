import { axiosVehicleInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { GET_SERVICE_REQUESTS_API } from "@/constants/api";
import type { FetchServiceRequestsQuery } from "@/types/service-requests";

export const getServiceRequests = async (query: FetchServiceRequestsQuery) => {
  const res = await axiosVehicleInstance.get(`${GET_SERVICE_REQUESTS_API}${createQueryString(query)}`);
  return res.data;
};