import { axiosVehicleInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { ASSIGN_VEHICLES_API, GET_VEHICLES_API } from "@/constants/api";
import type { AssignVehicleType, CreateVehicleType, FetchVehiclesQuery } from "@/types/vehicles";

export const getVehicles = async (query: FetchVehiclesQuery) => {
  const res = await axiosVehicleInstance.get(`${GET_VEHICLES_API}${createQueryString(query)}`);
  return res.data;
};

export const createVehicle = async (data: CreateVehicleType) => {
  const res = await axiosVehicleInstance.post(GET_VEHICLES_API, data);
  return res.data;
};

export const assignVehicle = async (data: AssignVehicleType) => {
  const res = await axiosVehicleInstance.post(ASSIGN_VEHICLES_API, data);
  return res.data;
};

export const getVehicle = async (id: string) => {
  const res = await axiosVehicleInstance.get(`${GET_VEHICLES_API}/${id}`);
  return res.data;
};