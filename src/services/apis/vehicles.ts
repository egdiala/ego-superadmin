import type { CreateVehicleType } from "@/types/vehicles";
import { axiosVehicleInstance } from "../axiosInstance";
import { GET_VEHICLES_API } from "@/constants/api";

export const getVehicles = async () => {
  const res = await axiosVehicleInstance.get(GET_VEHICLES_API);
  return res.data;
};

export const createVehicle = async (data: CreateVehicleType) => {
  const res = await axiosVehicleInstance.post(GET_VEHICLES_API, data);
  return res.data;
};