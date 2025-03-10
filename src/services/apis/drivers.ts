import { axiosInstance } from "../axiosInstance";
import type { BulkUploadDriversParams, CreateDriverType, FetchDriversQuery, UpdateUserStatusType } from "@/types/drivers";
import { BULK_UPLOAD_DRIVERS_API, CREATE_DRIVER_API, UPDATE_DRIVER_STATUS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getDrivers = async (query: FetchDriversQuery) => {
  const res = await axiosInstance.get(`${CREATE_DRIVER_API}${createQueryString(query)}`);
  return res.data;
};

export const getDriver = async (id: string) => {
  const res = await axiosInstance.get(`${CREATE_DRIVER_API}/${id}`);
  return res.data;
};

export const createDriver = async (data: CreateDriverType) => {
  const res = await axiosInstance.post(CREATE_DRIVER_API, data);
  return res.data;
};

export const editDriver = async (payload: CreateDriverType & { id: string }) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${CREATE_DRIVER_API}/${id}`, rest);
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

export const deleteDriver = async (id: string) => {
  const res = await axiosInstance.delete(`${CREATE_DRIVER_API}/${id}`);
  return res.data;
};

export const updateUserStatus = async (payload: UpdateUserStatusType) => {
  const { auth_id, ...rest } = payload
  const res = await axiosInstance.put(`${UPDATE_DRIVER_STATUS_API}/${auth_id}`, rest);
  return res.data;
};