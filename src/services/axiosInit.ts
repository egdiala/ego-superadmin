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
    const leadingUrl = "https://stagingapp.zeno.ng/ego-"
    axiosInstance.defaults.baseURL = mode === "test" ? "https://stagingapp.zeno.ng/ego-user-service" : import.meta.env.VITE_EGO_BASE_URL;
    axiosMessagingInstance.defaults.baseURL = mode === "test" ? import.meta.env.VITE_EGO_MESSAGING_URL : `https://${(import.meta.env.VITE_EGO_MESSAGING_URL).toString().replace(leadingUrl, "")}-api.apps.cabzero.ng`;
    axiosSettingsInstance.defaults.baseURL = mode === "test" ? import.meta.env.VITE_EGO_SETTINGS_URL : `https://${(import.meta.env.VITE_EGO_SETTINGS_URL).toString().replace(leadingUrl, "")}-api.apps.cabzero.ng`;
    axiosVehicleInstance.defaults.baseURL = mode === "test" ? import.meta.env.VITE_EGO_VEHICLE_URL : `https://${(import.meta.env.VITE_EGO_VEHICLE_URL).toString().replace(leadingUrl, "")}-api.apps.cabzero.ng`;
    axiosTripReportInstance.defaults.baseURL = mode === "test" ? import.meta.env.VITE_EGO_TRIP_REPORTING_URL : `https://${(import.meta.env.VITE_EGO_TRIP_REPORTING_URL).toString().replace(leadingUrl, "")}-api.apps.cabzero.ng`;
    axiosWalletInstance.defaults.baseURL = mode === "test" ? import.meta.env.VITE_EGO_WALLET_URL : `https://${(import.meta.env.VITE_EGO_WALLET_URL).toString().replace(leadingUrl, "")}-api.apps.cabzero.ng`;
}