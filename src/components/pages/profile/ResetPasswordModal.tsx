import React, { useCallback } from "react";
import { Button, PasswordInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useEditAdmin } from "@/services/hooks/mutations";
import { editAdminPasswordSchema } from "@/validations/admin";
import { useNavigate } from "react-router-dom";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";
import { removeItem } from "@/utils/localStorage";

interface ResetPasswordModalProps {
    isOpen: boolean;
    id: string;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, id, close }) => {
    const navigate = useNavigate()
    const logOut = async (): Promise<void> => {
        removeItem(APP_TOKEN_STORAGE_KEY);
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login");
    }
    
    const { mutate: edit, isPending } = useEditAdmin(async() => {
        await closeModal();
        await logOut();
    }, "Password Reset")

    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
        validationSchema: editAdminPasswordSchema,
        onSubmit(values) {
            edit({ id, ...values })
        },
    })

    const closeModal = useCallback(async() => {
        resetForm();
        close(false);
    },[close, resetForm])

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="flex items-center justify-between">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Reset Password
                        </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <div className="grid gap-6">
                        <PasswordInput label="Current Password" placeholder="••••••••••••••••" showPassword {...register("old_password")} />
                        <PasswordInput label="New Password" placeholder="••••••••••••••••" showPassword {...register("new_password")} />
                        <PasswordInput label="Confirm New Password" placeholder="Password123" showPassword {...register("confirm_password")} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Update Password</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}