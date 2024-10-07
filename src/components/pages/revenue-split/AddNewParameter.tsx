import React, { useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import { useGetFees } from "@/services/hooks/queries";
import { useCreateFee } from "@/services/hooks/mutations";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { addNewParameterSchema } from "@/validations/revenue-split";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedFeeVariable, FetchFeesQuery } from "@/types/fees";

interface AddNewParameterProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
    msg: string;
    screenName: FetchFeesQuery["screen_name"]
}

export const AddNewParameter: React.FC<AddNewParameterProps> = ({ isOpen, close, msg, screenName }) => {
    const { mutate, isPending } = useCreateFee(msg, () => closeModal())
    const { data: fetchedParameters, isFetching } = useGetFees<FetchedFeeVariable[]>({ screen_name: screenName, component: "fee_variables" })
    const { handleSubmit, isValid, register, resetForm, values } = useFormikWrapper({
        initialValues: {
            tag: "",
            amount_type: "" as "fixed" | "percent",
            amount: "",
        },
        validationSchema: addNewParameterSchema,
        onSubmit: () => {
            const { amount, ...rest } = values
            const payload = {
                ...rest,
                amount: amount.toString(),
                screen_name: screenName
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
                                Add New Parameter
                            </DialogTitle>
                            <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>
                        <div className="grid gap-6">
                            <SelectInput label="Name" options={parameters} disabled={isFetching} {...register("tag")} />
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
                            <Button type="submit" theme="primary" disabled={isPending || !isValid} loading={isPending} block>Add Parameter</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}