import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_SERVICE_REQUEST } from "@/constants/queryKeys";
import { updateServiceRequest } from "@/services/apis/service-request";

// eslint-disable-next-line no-unused-vars
export const useUpdateServiceRequest = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateServiceRequest,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_SERVICE_REQUEST] });
            successToast({ message: "Request status updated successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};