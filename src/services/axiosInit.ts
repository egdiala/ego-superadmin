import { axiosInstance, axiosMessagingInstance, axiosSettingsInstance, axiosVehicleInstance } from "./axiosInstance";

export function axiosInit(token: string) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosMessagingInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosSettingsInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosVehicleInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}