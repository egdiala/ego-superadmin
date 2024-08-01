import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_DRIVERS } from "@/constants/queryKeys";
import { bulkUploadDrivers, createDriver } from "@/services/apis/drivers";
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
            successToast({ message: "Driver Added Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};