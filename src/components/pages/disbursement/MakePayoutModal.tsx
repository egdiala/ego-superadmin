import React from "react";
import { Icon } from "@iconify/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface MakePayoutModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const MakePayoutModal: React.FC<MakePayoutModalProps> = ({ isOpen, close }) => {
    const payoutItems = [{ label: "Asset Company", value: "asset company" }, { label: "Tech Company", value: "tech company" }, { label: "Daily Tax", value: "daily tax" }]

    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            amount: "",
            item: "",
            month: "",
        },
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
                    <div className="flex items-center justify-between">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Make a Payout
                        </DialogTitle>
                        <button type="button" onClick={onClose} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <div className="grid gap-6">
                        <Input type="text" label="Amount" {...register("amount")} />
                        <SelectInput options={payoutItems} label="Payout Item" {...register("item")} />
                        <SelectInput options={payoutItems} label="Month" {...register("month")} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" disabled={!isValid} block>Submit</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}