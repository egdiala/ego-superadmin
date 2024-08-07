import { axiosVehicleInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { ASSIGN_VEHICLES_API, BULK_UPLOAD_VEHICLES_API, GET_VEHICLES_API, REVOKE_VEHICLE_API } from "@/constants/api";
import type { AssignVehicleType, BulkUploadVehiclesParams, CreateVehicleType, FetchVehiclesQuery } from "@/types/vehicles";

export const getVehicles = async (query: FetchVehiclesQuery) => {
  const res = await axiosVehicleInstance.get(`${GET_VEHICLES_API}${createQueryString(query)}`);
  return res.data;
};

export const createVehicle = async (data: CreateVehicleType) => {
  const res = await axiosVehicleInstance.post(GET_VEHICLES_API, data);
  return res.data;
};

export const bulkUploadVehicles = async (payload: BulkUploadVehiclesParams) => {
  const res = await axiosVehicleInstance.post(BULK_UPLOAD_VEHICLES_API, payload.files, {
    headers: {
      "Accept": "application/form-data",
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: payload.onUploadProgress
  });
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

export const revokeVehicle = async (data: AssignVehicleType) => {
  const res = await axiosVehicleInstance.post(REVOKE_VEHICLE_API, data);
  return res.data;
};