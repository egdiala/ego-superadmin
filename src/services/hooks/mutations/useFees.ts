import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_FEES } from "@/constants/queryKeys";
import { createFee } from "@/services/apis/fees";

// eslint-disable-next-line no-unused-vars
export const useCreateFee = (msg: string, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFee,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_FEES] });
            successToast({ message: msg })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};