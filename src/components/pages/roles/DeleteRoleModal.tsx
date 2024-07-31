import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { Button, TextArea } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FetchedRolesType } from "@/types/roles";
import { useDeleteRole } from "@/services/hooks/mutations";
import { deleteRoleSchema } from "@/validations/roles";

interface DeleteRoleModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
    role: FetchedRolesType | null
}

export const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ isOpen, close, role }) => {

    const { mutateAsync: deleteRole, isPending } = useDeleteRole()
    
    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            reason: "",
        },
        validationSchema: deleteRoleSchema,
        onSubmit: () => {
            deleteRole(role?.role_id as string).then(() => {
                closeModal()
            })
        }
    })

    const closeModal = useCallback(() => {
        close(false);
        resetForm();
    }, [close, resetForm])
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-5 justify-between w-full max-w-[30.625rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                                Delete {role?.name}?
                            </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>
                        <p className="text-grey-dark-3 text-sm">This action would remove {role?.name} from this platform.</p>
                    </div>
                    <TextArea placeholder="Reason" {...register("reason")} />
                    <div className="flex items-center justify-end w-full md:w-2/3 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" disabled={isPending || !isValid} loading={isPending} block>Delete Role</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}