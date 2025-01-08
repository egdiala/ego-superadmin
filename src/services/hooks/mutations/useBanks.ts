import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_FEE_BANK_LOGS } from "@/constants/queryKeys";
import { confirmAccountInfo, createFeeBank, deleteFeeBank } from "@/services/apis/banks";
import type { ConfirmedAccountInfo } from "@/types/banks";

// eslint-disable-next-line no-unused-vars
export const useCreateBank = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFeeBank,
        onSuccess: () => {
            successToast({ message: "Bank Account Added Successfully!" })
            queryClient.invalidateQueries({ queryKey: [GET_FEE_BANK_LOGS] });
            fn?.();
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useConfirmBankInfo = (fn?: (v: ConfirmedAccountInfo) => void) => {
    return useMutation({
        mutationFn: confirmAccountInfo,
        onSuccess: (response) => {
            fn?.(response?.data);
            return response?.data
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteBank = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteFeeBank,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GET_FEE_BANK_LOGS] });
            successToast({ message: "Bank Account Deleted Successfully!" })
            fn?.();
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};