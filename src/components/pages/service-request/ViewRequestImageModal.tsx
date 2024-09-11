import React from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ViewRequestImageModalProps {
    isOpen: boolean;
    close: () => void
}

export const ViewRequestImageModal: React.FC<ViewRequestImageModalProps> = ({ isOpen, close }) => {
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="div" transition className="flex flex-col justify-between w-full max-w-screen-lg h-screen-md rounded-lg overflow-hidden bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="flex items-center justify-between px-4 py-2">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Uploaded Image
                        </DialogTitle>
                        <button type="button" onClick={close} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <img src="https://images.pexels.com/photos/515674/pexels-photo-515674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="engine" className="object-cover object-center" />
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}