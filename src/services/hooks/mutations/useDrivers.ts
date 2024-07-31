import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_DRIVERS } from "@/constants/queryKeys";
import { createDriver } from "@/services/apis/drivers";

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