import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_PAYOUTS } from "@/constants/queryKeys";
import { approvePayout } from "@/services/apis/payment";

// eslint-disable-next-line no-unused-vars
export const useApprovePayout = (msg: string, fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: approvePayout,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_PAYOUTS] });
            successToast({ message: msg })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};