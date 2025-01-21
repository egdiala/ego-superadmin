import axios, { AxiosInstance } from "axios";
import { axiosInit, setBaseURL } from "./axiosInit";

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

export const axiosTripReportInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_TRIP_REPORTING_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWalletInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_WALLET_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosMapInstance: AxiosInstance = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;
const userData = localStorage.getItem("user") as string


if (token) {
  if (userData) {
    const userObj = JSON.parse(userData)
    setBaseURL(userObj?.data_mode)
  }
  axiosInit(token)
}