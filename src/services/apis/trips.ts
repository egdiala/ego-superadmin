import { GET_TRIPS_API, GET_VEHICLE_DISTANCE_FOR_ORG_API } from "@/constants/api";
import { axiosTripReportInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { FetchDistanceForOrgQuery, FetchTripsQuery } from "@/types/trips";

export const getTrips = async (query: FetchTripsQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIPS_API}${createQueryString(query)}`);
  return res.data;
};

export const getTrip = async (id: string) => {
  const res = await axiosTripReportInstance.get(`${GET_TRIPS_API}/${id}`);
  return res.data;
};

export const getVehicleDistanceForOrg = async (query: FetchDistanceForOrgQuery) => {
  const res = await axiosTripReportInstance.get(`${GET_VEHICLE_DISTANCE_FOR_ORG_API}${createQueryString(query)}`)
  return res.data;
}