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

export const otherInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EGO_OTHER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosCountryInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COUNTRY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-CSCAPI-KEY": import.meta.env.VITE_COUNTRY_API_KEY
  },
});

export const axiosPaystackInstance: AxiosInstance = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;


if (token) {
  axiosInit(token)
}