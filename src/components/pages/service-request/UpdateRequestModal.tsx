import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, SelectInput, TextArea } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { SingleServiceRequest } from "@/types/service-requests";
import { useUpdateServiceRequest } from "@/services/hooks/mutations";
import { updateServiceRequestSchema } from "@/validations/service-request";

interface UpdateRequestModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
    request: SingleServiceRequest
}

export const UpdateRequestModal: React.FC<UpdateRequestModalProps> = ({ isOpen, close, request }) => {
    const statuses = [
        { label: "Pending", value: "0" },
        { label: "Scheduled", value: "1" },
        { label: "In Progress", value: "2" },
        { label: "Completed", value: "3" },
        { label: "Rejected", value: "4" },
    ]
    const { mutate, isPending } = useUpdateServiceRequest(() => closeModal())
    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            status: request?.status?.toString() || "",
            comment: ""
        },
        enableReinitialize: true,
        validationSchema: updateServiceRequestSchema,
        onSubmit(values) {
            mutate({ ...values, id: request?.service_req_id })
        }
    })

    const closeModal = useCallback(() => {
        close(false);
        resetForm();
    }, [close, resetForm])
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-4 justify-between w-full max-w-[30.625rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="flex items-center justify-between">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Update Service Request
                        </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <SelectInput label="Update Maintenance Status" options={statuses} {...register("status")} />
                    <TextArea placeholder="Reason" {...register("comment")} />
                    <div className="flex items-center justify-end w-full md:w-2/3 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" disabled={isPending || !isValid} loading={isPending} block>Update</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}