import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { addNewParameterSchema } from "@/validations/revenue-split";

interface EditParameterProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const EditParameter: React.FC<EditParameterProps> = ({ isOpen, close }) => {
    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            name: "",
            select_value: "",
            amount: "",
            percentage: ""
        },
        validationSchema: addNewParameterSchema,
        onSubmit: () => {
        },
    })

    const closeModal = useCallback(() => {
        resetForm()
        close(false);
    }, [close, resetForm])
    
    const selectValue = [
        { label: "Amount (₦)", value: "amount" },
        { label: "Percentage (%)", value: "percentage" },
        { label: "Amount + Percentage", value: "amount_percentage" },
    ]

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
            <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
                <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                    <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                        <div className="flex items-center justify-between">
                            <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                                Edit Parameter
                            </DialogTitle>
                            <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>
                        <div className="grid gap-6">
                            <Input type="text" label="Name" {...register("name")} />
                            <SelectInput label="Select Value" options={selectValue} {...register("select_value")} />
                            <Input type="number" className="hide-number-input-arrows" label="Amount (₦)" {...register("amount")} />
                            <Input type="number" className="hide-number-input-arrows" label="Percentage (%)" {...register("percentage")} />
                        </div>
                        <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                            <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                            <Button type="submit" theme="primary" disabled={!isValid} block>Update Parameter</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}