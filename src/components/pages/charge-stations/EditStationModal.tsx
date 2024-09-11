import React from "react";
import { Button, Input } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";


interface EditStationModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const EditStationModal: React.FC<EditStationModalProps> = ({ isOpen, close }) => {

    const { handleSubmit, register, resetForm } = useFormikWrapper({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            opening_time: "",
            closing_time: ""
        },
        enableReinitialize: true,
        onSubmit: () => {
            
        },
    })

    const onClose = () => {
        resetForm();
        close(false);
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Edit Charge Station
                    </DialogTitle>
                    <div className="grid gap-6">
                        <Input type="text" label="Station Name" {...register("first_name")} />
                        <Input type="text" label="Full Address" {...register("last_name")} />
                        <Input type="text" label="Address LGA" {...register("email")} />
                        <Input type="text" label="Contact Phone" {...register("phone_number")} />
                        <div className="grid grid-cols-2 gap-6">
                            <Input type="text" label="Opening Time" iconRight="ph:timer-fill" {...register("opening_time")} />
                            <Input type="text" label="Closing Time" iconRight="ph:timer-fill" {...register("closing_time")} />     
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" block>Update</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}