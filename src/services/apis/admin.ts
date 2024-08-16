import { axiosInstance } from "../axiosInstance";
import type { CreateAdminType, FetchAdminsQuery, UpdateAdminType } from "@/types/admin";
import { CREATE_ADMIN_API, GET_ADMIN_PROFILE_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const createAdmin = async (data: CreateAdminType) => {
    const res = await axiosInstance.post(CREATE_ADMIN_API, data);
    return res.data;
};

export const editAdmin = async (data: Partial<UpdateAdminType> & { id: string; }) => {
    const { id, ...rest } = data
    const res = await axiosInstance.put(`${CREATE_ADMIN_API}/${id}`, rest);
    return res.data;
};

export const getAdmins = async (query: FetchAdminsQuery) => {
    const res = await axiosInstance.get(`${CREATE_ADMIN_API}${createQueryString(query)}`);
    return res.data;
};

export const getAdmin = async (id: string) => {
    const res = await axiosInstance.get(`${CREATE_ADMIN_API}/${id}`);
    return res.data;
};

export const getAdminProfile = async () => {
    const res = await axiosInstance.get(GET_ADMIN_PROFILE_API);
    return res.data;
};