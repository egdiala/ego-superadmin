import React from "react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface DeleteDriverModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const DeleteDriverModal: React.FC<DeleteDriverModalProps> = ({ isOpen, close }) => {
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-4 justify-between w-full max-w-[21.875rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full data-[closed]:opacity-0">
                    <img src={caution} alt="caution" className="size-12" />
                    <div className="grid gap-1">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Delete [driver name]?
                        </DialogTitle>
                        <p className="text-grey-dark-3 text-sm">This action would remove [driver name] from this platform and is irreversible.</p>
                    </div>
                    <div className="flex items-center w-full gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                        <Button type="submit" theme="primary" block>Delete</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}