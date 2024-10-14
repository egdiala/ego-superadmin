import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_ADMIN_PROFILE, GET_ADMINS } from "@/constants/queryKeys";
import { createAdmin, editAdmin, uploadProfilePhoto } from "@/services/apis/admin";

// eslint-disable-next-line no-unused-vars
export const useCreateAdmin = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAdmin,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ADMINS] });
            successToast({ message: "Admin Added Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useUploadProfilePhoto = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadProfilePhoto,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ADMIN_PROFILE] });
            successToast({ message: "Profile photo uploaded successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useEditAdmin = (fn?: (v: any) => void, mode: string = "Edited") => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editAdmin,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ADMINS] });
            queryClient.invalidateQueries({ queryKey: [GET_ADMIN_PROFILE] });
            successToast({ message: `Admin ${mode} Successfully!` })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};