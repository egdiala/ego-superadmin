import { GET_TRIPS_API } from "@/constants/api";
import { axiosTripReportInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { FetchTripsQuery } from "@/types/trips";

export const getTrips = async (query: FetchTripsQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIPS_API}${createQueryString(query)}`);
  return res.data;
};

export const getTrip = async (id: string) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIPS_API}/${id}`);
  return res.data;
};