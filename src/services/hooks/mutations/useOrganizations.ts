import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_ORGANIZATIONS } from "@/constants/queryKeys";
import { createOrganization } from "@/services/apis/organizations";

// eslint-disable-next-line no-unused-vars
export const useCreateOrganization = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrganization,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_ORGANIZATIONS] });
            successToast({ message: "Organization Created Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};