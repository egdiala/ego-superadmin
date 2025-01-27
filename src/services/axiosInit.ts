import { axiosInstance, axiosMessagingInstance, axiosSettingsInstance, axiosTripReportInstance, axiosVehicleInstance, axiosWalletInstance } from "./axiosInstance";

export function axiosInit(token: string) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosMessagingInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosSettingsInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosVehicleInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosTripReportInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosWalletInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function setBaseURL(mode: string) {
    if (mode === "test") {
        axiosInstance.defaults.baseURL = "https://stagingapp.zeno.ng/ego-user-service"
        axiosMessagingInstance.defaults.baseURL = import.meta.env.VITE_EGO_MESSAGING_URL;
        axiosSettingsInstance.defaults.baseURL = import.meta.env.VITE_EGO_SETTINGS_URL;
        axiosVehicleInstance.defaults.baseURL = import.meta.env.VITE_EGO_VEHICLE_URL;
        axiosTripReportInstance.defaults.baseURL = import.meta.env.VITE_EGO_TRIP_REPORTING_URL;
        axiosWalletInstance.defaults.baseURL = import.meta.env.VITE_EGO_WALLET_URL;
    } else {
        axiosInstance.defaults.baseURL = "https://user-service-api.apps.cabzero.ng";
        axiosMessagingInstance.defaults.baseURL = "https://message-service-api.apps.cabzero.ng";
        axiosSettingsInstance.defaults.baseURL = "https://setting-service-api.apps.cabzero.ng";
        axiosVehicleInstance.defaults.baseURL = "https://vehicle-service-api.apps.cabzero.ng";
        axiosTripReportInstance.defaults.baseURL = "https://trip-reporting-api.apps.cabzero.ng";
        axiosWalletInstance.defaults.baseURL = "https://wallet-service-api.apps.cabzero.ng";
    }
}