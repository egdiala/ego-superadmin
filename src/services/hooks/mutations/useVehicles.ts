import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_VEHICLE, GET_VEHICLES } from "@/constants/queryKeys";
import { assignVehicle, bulkUploadVehicles, createVehicle, deleteVehicle, editVehicle, revokeVehicle } from "@/services/apis/vehicles";
import type { Dispatch, SetStateAction } from "react";

// eslint-disable-next-line no-unused-vars
export const useCreateVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLES] });
            successToast({ message: "Vehicle Created Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useEditVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLE] });
            successToast({ message: "Vehicle Edited Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useAssignVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: assignVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLES] });
            successToast({ message: "Vehicle Assigned Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLES] });
            successToast({ message: "Vehicle Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useRevokeVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: revokeVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLE] });
            successToast({ message: "Vehicle Revoked Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useBulkUploadVehicles = (setProgress: Dispatch<SetStateAction<number>>, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: bulkUploadVehicles,
        onMutate: () => {
            setProgress(0); // Reset progress when mutation starts
        },
        onSuccess: (response: any) => {
            setProgress(100);
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLES] });
            successToast({ message: "Vehicles Added Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};
