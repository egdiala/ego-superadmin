import React, { useCallback } from "react";
import { Button, PasswordInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Icon } from "@iconify/react";

interface ResetPasswordModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, close }) => {

    const closeModal = useCallback(() => {
        close(false);
    },[close])

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="flex items-center justify-between">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Reset Password
                        </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <div className="grid gap-6">
                        <PasswordInput label="Current Password" placeholder="••••••••••••••••" showPassword />
                        <PasswordInput label="New Password" placeholder="••••••••••••••••" showPassword />
                        <PasswordInput label="Confirm New Password" placeholder="Password123" showPassword />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                        <Button theme="primary" block>Update Password</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}