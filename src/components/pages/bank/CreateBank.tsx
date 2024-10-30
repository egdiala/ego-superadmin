import React, { useEffect, useState } from "react";
import { FetchedBankList } from "@/types/banks";
import { Button, Input } from "@/components/core";
import { updateModelSchema } from "@/validations/oem";
import { ComboBox } from "@/components/core/ComboBox";
import { useGetBankList, useValidateBank } from "@/services/hooks/queries";
import { useCreateBank } from "@/services/hooks/mutations";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CreateBankModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const CreateBankModal: React.FC<CreateBankModalProps> = ({ isOpen, close }) => {
    const [query, setQuery] = useState("")
    const { data: banks, isLoading } = useGetBankList()
    const { mutate: create, isPending } = useCreateBank(() => onClose())

    const filteredRoles =
        query === ""
        ? banks
        : banks?.filter((bank) => {
            return bank.Bankname.toLowerCase().includes(query.toLowerCase())
            })

    const { handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            reference_name: "",
            bank_code: "",
            bank_name: "",
            account_number: "",
        },
        validationSchema: updateModelSchema,
        onSubmit: () => {
            create(values)
        },
    })

    const { data: bankDetails, refetch: validateBank, isSuccess } = useValidateBank({ account_number: values?.account_number, bank_code: values?.bank_code })

    useEffect(() => {
        if (isSuccess) {
            console.log(bankDetails)
        }
    }, [isSuccess])

    useEffect(() => {
        if (values?.bank_code && (values?.account_number?.length === 10)) {
            validateBank()
        }
    }, [values?.account_number?.length, values?.bank_code])

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
                        Add New Bank Account
                    </DialogTitle>
                    <div className="grid gap-6">
                        <ComboBox
                            label="Bank Name"
                            disabled={isLoading}
                            onClose={() => setQuery("")}
                            options={filteredRoles ?? []} 
                            onChange={(value) => setQuery(value)} 
                            displayValue={(item: FetchedBankList) => item?.Bankname} 
                            optionLabel={(option: FetchedBankList) => option?.Bankname} 
                            setSelected={async(value: FetchedBankList) => {
                                await setFieldValue("bank_name", value?.Bankname)
                                await setFieldValue("bank_code", value?.Bankcode)
                            }} 
                        />
                        <Input label="Account Number" type="text" {...register("account_number")} />
                        <Input label="Reference Name" type="text" readOnly {...register("reference_name")} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" disabled={isPending} onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Add Bank Account</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}