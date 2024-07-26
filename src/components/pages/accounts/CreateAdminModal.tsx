import React from "react";
import { Button, Input } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CreateAdminModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ isOpen, close }) => {

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Add a New Admin
                    </DialogTitle>
                    <div className="grid gap-6">
                        <Input type="text" label="First Name" />
                        <Input type="text" label="Last Name" />
                        <Input type="text" label="Email" />
                        <Input type="text" label="Department" />
                        <Input type="text" label="Role" />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                        <Button theme="primary" block>Add Admin Account</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}