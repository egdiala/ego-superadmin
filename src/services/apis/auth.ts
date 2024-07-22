import { axiosInstance } from "../axiosInstance";
import type { LoginType, SetPasswordType } from "@/types/auth";
import { CHANGE_PASSWORD_API, LOGIN_API, SEND_RESET_PASSWORD_EMAIL_API } from "@/constants/api";

export const login = async (data: LoginType) => {
  const res = await axiosInstance.post(LOGIN_API, data);
  return res.data;
};

export const setPassword = async (data: SetPasswordType) => {
  const res = await axiosInstance.post(CHANGE_PASSWORD_API, data);
  return res.data;
};

export const sendResetPasswordEmail = async (data: Partial<LoginType>) => {
  const res = await axiosInstance.post(SEND_RESET_PASSWORD_EMAIL_API, data);
  return res.data;
};