import React, { useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useGetFees } from "@/services/hooks/queries";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { addNewParameterSchema } from "@/validations/revenue-split";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedFeeVariable, FetchedRevenueSplit } from "@/types/fees";
import { AnimatePresence } from "framer-motion";
import { useEditFee } from "@/services/hooks/mutations";

interface EditParameterProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
    parameter: FetchedRevenueSplit
}

export const EditParameter: React.FC<EditParameterProps> = ({ isOpen, close, parameter }) => {
    const { mutate, isPending } = useEditFee(`${parameter?.name} edited successfully!`, () => closeModal())
    const { data: fetchedParameters } = useGetFees<FetchedFeeVariable[]>({ screen_name: parameter?.screen_name as any, component: "fee_variables" })
    const { handleSubmit, isValid, register, resetForm, values } = useFormikWrapper({
        initialValues: {
            tag: parameter?.tag || "",
            amount_type: parameter?.amount_type || "" as "fixed" | "percent",
            amount: parameter?.amount || ""
        },
        enableReinitialize: true,
        validationSchema: addNewParameterSchema,
        onSubmit: () => {
            const { amount, ...rest } = values
            const payload = {
                ...rest,
                amount: amount.toString(),
                screen_name: parameter?.screen_name,
                fee_id: parameter?.fee_id
            }
            mutate(payload)
        },
    })

    const parameters = useMemo(() => {
        if (fetchedParameters === undefined) {
            return []
        }
        return fetchedParameters?.map((item) => ({ label: item?.name, value: item?.tag }))
    }, [fetchedParameters])

    const closeModal = useCallback(() => {
        resetForm()
        close(false);
    }, [close, resetForm])
    
    const selectValue = [
        { label: "Amount (₦)", value: "fixed" },
        { label: "Percentage (%)", value: "percent" },
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
                            <SelectInput label="Name" options={parameters} disabled {...register("tag")} />
                            <SelectInput label="Select Value" options={selectValue} {...register("amount_type")} />
                            <AnimatePresence>
                                {
                                    values?.amount_type === "fixed" && (
                                        <Input type="number" className="hide-number-input-arrows" label="Amount (₦)" {...register("amount")} />
                                    )
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {
                                    values?.amount_type === "percent" && (
                                        <Input type="number" className="hide-number-input-arrows" label="Percentage (%)" {...register("amount")} />
                                    )
                                }
                            </AnimatePresence>
                        </div>
                        <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                            <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                            <Button type="submit" theme="primary" disabled={isPending || !isValid} loading={isPending} block>Update Parameter</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}