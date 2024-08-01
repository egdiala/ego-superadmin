import type { BulkUploadDriversParams, CreateDriverType } from "@/types/drivers";
import { axiosInstance } from "../axiosInstance";
import { BULK_UPLOAD_DRIVERS_API, CREATE_DRIVER_API } from "@/constants/api";

export const createDriver = async (data: CreateDriverType) => {
  const res = await axiosInstance.post(CREATE_DRIVER_API, data);
  return res.data;
};

export const getDrivers = async () => {
  const res = await axiosInstance.get(CREATE_DRIVER_API);
  return res.data;
};

export const getDriver = async (id: string) => {
  const res = await axiosInstance.get(`${CREATE_DRIVER_API}/${id}`);
  return res.data;
};

export const bulkUploadDrivers = async (payload: BulkUploadDriversParams) => {
  const res = await axiosInstance.post(BULK_UPLOAD_DRIVERS_API, payload.files, {
    headers: {
      "Accept": "application/form-data",
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: payload.onUploadProgress
  });
  return res.data;
};