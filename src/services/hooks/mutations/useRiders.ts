import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_RIDER, GET_RIDERS } from "@/constants/queryKeys";
import { deleteRider, updateRiderStatus } from "@/services/apis/riders";

// eslint-disable-next-line no-unused-vars
export const useDeleteRider = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRider,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_RIDERS] });
            successToast({ message: "Rider Deleted Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useUpdateRiderStatus = (message: string, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRiderStatus,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_RIDER] });
            successToast({ message })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};