import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_CHARGE_STATION, GET_CHARGE_STATIONS } from "@/constants/queryKeys";
import type { Dispatch, SetStateAction } from "react";
import { bulkUploadChargeStations, createChargeStation, deleteChargeStation, editChargeStation } from "@/services/apis/charge-stations";

// eslint-disable-next-line no-unused-vars
export const useCreateStation = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createChargeStation,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_CHARGE_STATIONS] });
            successToast({ message: "Charge Station Created Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useBulkUploadStations = (setProgress: Dispatch<SetStateAction<number>>, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: bulkUploadChargeStations,
        onMutate: () => {
            setProgress(0); // Reset progress when mutation starts
        },
        onSuccess: (response: any) => {
            setProgress(100);
            queryClient.invalidateQueries({ queryKey: [GET_CHARGE_STATIONS] });
            if (!!response?.data?.valid_upload_count && response?.data?.valid_upload_count > 0) {    
                successToast({ message: "Charge Stations Added Successfully!" })
                fn?.(response);
            }
            if (!!response?.data?.not_upload_count && response?.data?.not_upload_count > 0) {
                errorToast({ message: response?.data?.msg })
                fn?.(response?.data);
            }
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteStation = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteChargeStation,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_CHARGE_STATIONS] });
            successToast({ message: "Charge Station Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useEditStation = (message: string, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editChargeStation,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_CHARGE_STATION] });
            queryClient.invalidateQueries({ queryKey: [GET_CHARGE_STATIONS] });
            successToast({ message })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};