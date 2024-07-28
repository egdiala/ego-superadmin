import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { createRole } from "../../apis/roles";

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