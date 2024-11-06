import { GET_RANKS_API, GET_TRIP_DATA_STATS_API, GET_TRIPS_API } from "@/constants/api";
import { axiosMapInstance, axiosTripReportInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import type { FetchDistanceForOrgQuery, FetchRanksQuery, FetchTripsQuery, ReverseGeocodeQuery } from "@/types/trips";

export const getTrips = async (query: FetchTripsQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIPS_API}${createQueryString(query)}`);
  return res.data;
};

export const getTrip = async (id: string) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIPS_API}/${id}`);
  return res.data;
};

export const getTripDataStats = async (query: FetchDistanceForOrgQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIP_DATA_STATS_API}${createQueryString(query)}`)
  return res.data;
}

export const getRanks = async (query: FetchRanksQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_RANKS_API}${createQueryString(query)}`);
  return res.data;
};

export const reverseGeocode = async (query: ReverseGeocodeQuery) => {
  const res = await axiosMapInstance.get(`json${createQueryString(query)}&key=${import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}`);
  return res;
};