import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_VEHICLES } from "@/constants/queryKeys";
import { assignVehicle, createVehicle } from "@/services/apis/vehicles";

// eslint-disable-next-line no-unused-vars
export const useCreateVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLES] });
            successToast({ message: "Vehicle Created Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useAssignVehicle = (fn?: (v: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: assignVehicle,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: [GET_VEHICLES] });
            successToast({ message: "Vehicle Assigned Successfully!" })
            fn?.(response);
        },
        onError: (err: any) => {
            errorToast(err)
        },
    });
};
