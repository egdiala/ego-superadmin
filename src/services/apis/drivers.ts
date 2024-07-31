import type { CreateDriverType } from "@/types/drivers";
import { axiosInstance } from "../axiosInstance";
import { CREATE_DRIVER_API } from "@/constants/api";

export const createDriver = async (data: CreateDriverType) => {
  const res = await axiosInstance.post(CREATE_DRIVER_API, data);
  return res.data;
};

export const getDrivers = async () => {
  const res = await axiosInstance.get(CREATE_DRIVER_API);
  return res.data;
};