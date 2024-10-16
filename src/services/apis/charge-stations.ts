import { axiosVehicleInstance } from "../axiosInstance";
import { createQueryString } from "@/utils/createQuery";
import { BULK_UPLOAD_CHARGE_STATIONS_API, GET_CHARGE_STATIONS_API } from "@/constants/api";
import type { BulkUploadChargeStationsParams, CreateChargeStationType, FetchChargeStationsQuery } from "@/types/charge-stations";

export const getChargeStations = async (query: FetchChargeStationsQuery) => {
  const res = await axiosVehicleInstance.get(`${GET_CHARGE_STATIONS_API}${createQueryString(query)}`);
  return res.data;
};

export const getChargeStation = async (id: string) => {
  const res = await axiosVehicleInstance.get(`${GET_CHARGE_STATIONS_API}/${id}`);
  return res.data;
};

export const createChargeStation = async (data: CreateChargeStationType) => {
  const res = await axiosVehicleInstance.post(GET_CHARGE_STATIONS_API, data);
  return res.data;
};

export const editChargeStation = async (data: CreateChargeStationType & { id: string; }) => {
    const { id, ...rest } = data
    const res = await axiosVehicleInstance.put(`${GET_CHARGE_STATIONS_API}/${id}`, rest);
    return res.data;
};

export const deleteChargeStation = async (id: string) => {
    const res = await axiosVehicleInstance.delete(`${GET_CHARGE_STATIONS_API}/${id}`);
    return res.data;
};

export const bulkUploadChargeStations = async (payload: BulkUploadChargeStationsParams) => {
  const res = await axiosVehicleInstance.post(BULK_UPLOAD_CHARGE_STATIONS_API, payload.files, {
    headers: {
      "Accept": "application/form-data",
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: payload.onUploadProgress
  });
  return res.data;
};