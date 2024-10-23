import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_OEMS } from "@/constants/queryKeys";
import { createOEM, deleteOEM, uploadOEMVehiclePicture } from "@/services/apis/oem";
import { CreateOEMResponseType } from "@/types/oem";

// eslint-disable-next-line no-unused-vars
export const useCreateOEM = (fn?: (v: CreateOEMResponseType) => void) => {
    return useMutation({
        mutationFn: createOEM,
        onSuccess: (response: any) => {
            fn?.(response.data as CreateOEMResponseType);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useUploadOEMPicture = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadOEMVehiclePicture,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_OEMS] });
            successToast({ message: "OEM created successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteOEM = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteOEM,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_OEMS] });
            successToast({ message: "OEM Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};