import React from "react";
import { Icon } from "@iconify/react";
import type { FetchedRider } from "@/types/riders";
import { Button, TextArea } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface DeleteStaffModalProps {
    isOpen: boolean;
    staff?: FetchedRider;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const DeleteStaffModal: React.FC<DeleteStaffModalProps> = ({ isOpen, close }) => {
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-4 justify-between w-full md:max-w-[30.625rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full data-[closed]:opacity-0">
                    <div className="flex items-start gap-3">
                        <div className="flex-1 grid gap-1">
                            <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                                Delete [Staff name]?
                            </DialogTitle>
                            <p className="text-grey-dark-3 text-sm">This action would delete [staff name] from this platform permanently.</p>
                        </div>
                        <button type="button" onClick={() => close(false)} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <TextArea placeholder="Reason" />
                    <div className="flex items-center w-full gap-2 md:gap-4 md:pt-6">
                        <Button type="button" theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                        <Button type="submit" theme="primary" block>Delete</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}