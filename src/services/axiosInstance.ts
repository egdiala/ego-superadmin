import axios, { AxiosInstance } from "axios";
import { axiosInit } from "./axiosInit";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosMessagingInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_MESSAGING_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosSettingsInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_SETTINGS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosVehicleInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_VEHICLE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const otherInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_OTHER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;


if (token) {
  axiosInit(token)
}