import React, { useMemo } from "react";
import { createDriverSchema } from "@/validations/driver";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { useEditDriver } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useGetStatesByCountry } from "@/services/hooks/queries";
import type { FetchedDriverType } from "@/types/drivers";

interface CreateDriverModalProps {
    isOpen: boolean;
    driver: FetchedDriverType
    close: () => void
}

export const EditDriverModal: React.FC<CreateDriverModalProps> = ({ isOpen, close, driver }) => {
    const { mutate: edit, isPending } = useEditDriver(() => onClose())
    const { data: states, isFetching: fetchingStates } = useGetStatesByCountry("NG")
    const fetchedStates = useMemo(() => {
        return states?.map((state) => ({ label: state.name, value: state.name }))?.sort((a,b) => a?.label > b?.label ? 1 : -1)
    }, [states])
    const genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
    ]

    const { dirty, handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            first_name: driver?.first_name || "",
            last_name: driver?.last_name || "",
            email: driver?.email || "",
            phone_number: driver?.phone_number || "",
            gender: driver?.gender || "",
            nin: driver?.nin_id?.value || "",
            driver_license: driver?.driver_license_id?.value || "",
            dob: driver?.dob || "",
            state_origin: driver?.state_origin || "",
        },
        enableReinitialize: true,
        validationSchema: createDriverSchema,
        onSubmit(values) {
            edit({ id: driver?.driver_id, ...values })
        },
    })

    const onClose = () => {
        resetForm();
        close();
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Edit Driver
                    </DialogTitle>
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <Input type="text" label="First Name" {...register("first_name")} />
                                <Input type="text" label="Last Name" {...register("last_name")} />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <Input type="text" label="Phone Number" {...register("phone_number")} />
                                <SelectInput options={genders} label="Gender" {...register("gender")} />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <Input type="text" label="NIN" {...register("nin")} />
                                <Input type="text" label="Driver’s License No." {...register("driver_license")} />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <Input type="date" label="Date of Birth" {...register("dob")} />
                                <SelectInput options={fetchedStates ?? []} disabled={fetchingStates} label="State of Origin" {...register("state_origin")} />
                            </div>
                            <Input type="text" label="Email" {...register("email")} />
                            {/* <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <Input type="text" label="Upload Driver’s License" optional />
                                <Input type="text" label="Upload Profile Image" />
                            </div> */}
                        </div>
                        <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                            <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                            <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid || !dirty} block>Edit Driver</Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}