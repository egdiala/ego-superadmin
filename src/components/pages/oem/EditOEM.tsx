import React from "react";
import { editOEMSchema } from "@/validations/oem";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useEditOEM } from "@/services/hooks/mutations";
import { Button, Input } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FetchedOEMType } from "@/types/oem";

interface EditOEMModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: () => void
    oem: FetchedOEMType;
}

export const EditOEMModal: React.FC<EditOEMModalProps> = ({ isOpen, close, oem }) => {
    const { mutate: edit, isPending } = useEditOEM(() => onClose())

    const { handleSubmit, isValid, register, resetForm, dirty } = useFormikWrapper({
        initialValues: {
            oem_name: oem?.oem_name || "",
        },
        validationSchema: editOEMSchema,
        enableReinitialize: true,
        onSubmit(values) {
            edit({ oem_name: values.oem_name, oem_id: oem?.oem_id })
        },
    })

    const onClose = () => {
        resetForm();
        close();
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Edit OEM Name
                    </DialogTitle>
                    <div className="grid gap-6">
                        <Input type="text" label="OEM Name" {...register("oem_name")} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid || !dirty} block>Edit OEM</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}