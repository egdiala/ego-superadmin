import { GET_OEM_API, UPLOAD_OEM_VEHICLE_PHOTO_API } from "@/constants/api";
import { axiosSettingsInstance, axiosVehicleInstance } from "../axiosInstance";
import type { CreateOEMType, DeleteOEMType, FetchOemQuery, UpdateModelType, UpdateOEMType, UploadEOMPictureType } from "@/types/oem";
import { createQueryString } from "@/utils/createQuery";

export const getOEMs = async (query?: FetchOemQuery) => {
  const res = await axiosVehicleInstance.get(`${GET_OEM_API}${createQueryString(query || {})}`);
  return res.data;
};

export const getOEM = async (id: string) => {
  const res = await axiosVehicleInstance.get(`${GET_OEM_API}/${id}`);
  return res.data;
};

export const createOEM = async (data: CreateOEMType) => {
  const res = await axiosVehicleInstance.post(GET_OEM_API, data);
  return res.data;
};

export const updateOEM = async (data: UpdateOEMType) => {
  const res = await axiosVehicleInstance.put(`${GET_OEM_API}/${data?.oem_id}`, { oem_name: data?.oem_name });
  return res.data;
};

export const updateModel = async (data: UpdateModelType) => {
  const { oem_id, ...rest } = data
  const res = await axiosVehicleInstance.put(`${GET_OEM_API}/${oem_id}`, rest);
  return res.data;
};

export const deleteOEM = async (data: DeleteOEMType) => {
  const { oem_id, ...rest } = data
  const res = await axiosVehicleInstance.delete(`${GET_OEM_API}/${oem_id}${createQueryString(rest)}`);
  return res.data;
};

export const uploadOEMVehiclePicture = async (data: UploadEOMPictureType) => {
    const { file, ...rest } = data
    const res = await axiosSettingsInstance.post(`${UPLOAD_OEM_VEHICLE_PHOTO_API}/${rest?.oem_id}?model_id=${rest?.model_id}`, file, {
        headers: {
        "Accept": "application/form-data",
        "Content-Type": "multipart/form-data"
        },
    });
    return res.data;
};