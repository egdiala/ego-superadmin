import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_NOTIFICATIONS } from "@/constants/queryKeys";
import { updateNotifications } from "@/services/apis/notifications";

// eslint-disable-next-line no-unused-vars
export const useUpdateNotifications = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATIONS] });
            fn?.();
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};