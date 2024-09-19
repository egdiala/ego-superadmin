import { GET_RANKS_API, GET_TRIP_DATA_STATS_API, GET_TRIPS_API } from "@/constants/api";
import { axiosTripReportInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import type { FetchDistanceForOrgQuery, FetchRanksQuery, FetchTripsQuery } from "@/types/trips";

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