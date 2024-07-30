import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { createRole, deleteRole, editRole } from "../../apis/roles";
import { GET_ROLES } from "@/constants/queryKeys";

// eslint-disable-next-line no-unused-vars
export const useCreateRole = (fn?: (v: any) => void) => {
    return useMutation({
        mutationFn: createRole,
        onSuccess: (response: any) => {
            successToast({ message: "Role Created Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteRole = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRole,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ROLES] });
            successToast({ message: "Role Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useEditRole = (fn?: (v: any) => void) => {
    return useMutation({
        mutationFn: editRole,
        onSuccess: (response: any) => {
            successToast({ message: "Role Edited Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};