import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_DRIVER, GET_DRIVERS } from "@/constants/queryKeys";
import { bulkUploadDrivers, createDriver, deleteDriver, updateUserStatus } from "@/services/apis/drivers";
import type { Dispatch, SetStateAction } from "react";

// eslint-disable-next-line no-unused-vars
export const useCreateDriver = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDriver,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_DRIVERS] });
            successToast({ message: "Driver Added Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useBulkUploadDrivers = (setProgress: Dispatch<SetStateAction<number>>, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: bulkUploadDrivers,
        onMutate: () => {
            setProgress(0); // Reset progress when mutation starts
        },
        onSuccess: (response: any) => {
            setProgress(100);
            queryClient.invalidateQueries({ queryKey: [GET_DRIVERS] });
            if (!!response?.data?.valid_upload_count && response?.data?.valid_upload_count > 0) {    
                successToast({ message: "Drivers Added Successfully!" })
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
export const useDeleteDriver = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDriver,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_DRIVERS] });
            successToast({ message: "Driver Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useUpdateUserStatus = (message: string, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserStatus,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_DRIVER] });
            successToast({ message })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};