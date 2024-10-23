import { GET_OEM_API, UPLOAD_OEM_VEHICLE_PHOTO_API } from "@/constants/api";
import { axiosSettingsInstance, axiosVehicleInstance } from "../axiosInstance";
import type { CreateOEMType, DeleteOEMType, UpdateOEMType, UploadEOMPictureType } from "@/types/oem";

export const getOEMs = async () => {
  const res = await axiosVehicleInstance.get(GET_OEM_API);
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

export const deleteOEM = async (data: DeleteOEMType) => {
  const res = await axiosVehicleInstance.delete(`${GET_OEM_API}/${data?.oem_id}`, data?.model_id ? { data: { model_id: data?.model_id } } : {} );
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