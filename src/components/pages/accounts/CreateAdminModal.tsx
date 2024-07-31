import React, { useState } from "react";
import { Button, Input, SelectInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { ComboBox } from "@/components/core/ComboBox";
import { useGetRoles } from "@/services/hooks/queries";
import type { FetchedRolesType } from "@/types/roles";
import { createAdminSchema } from "@/validations/admin";
import { useCreateAdmin } from "@/services/hooks/mutations";

interface CreateAdminModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ isOpen, close }) => {
    const [query, setQuery] = useState("")
    const { data: roles, isFetching } = useGetRoles()
    const { mutate: create, isPending } = useCreateAdmin(() => onClose())
    const genders = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }]

    const filteredRoles =
        query === ""
        ? roles
        : roles?.filter((role) => {
            return role.name.toLowerCase().includes(query.toLowerCase())
            })

    const { handleSubmit, isValid, register, resetForm, setFieldValue } = useFormikWrapper({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            gender: "",
            role_id: ""
        },
        validationSchema: createAdminSchema,
        onSubmit(values) {
            create(values)
        },
    })

    const onClose = () => {
        resetForm();
        close(false);
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Add a New Admin
                    </DialogTitle>
                    <div className="grid gap-6">
                        <Input type="text" label="First Name" {...register("first_name")} />
                        <Input type="text" label="Last Name" {...register("last_name")} />
                        <Input type="text" label="Email" {...register("email")} />
                        <Input type="text" label="Phone Number" {...register("phone_number")} />
                        <SelectInput options={genders} label="Gender" {...register("gender")} />
                        <ComboBox
                            label="Role"
                            disabled={isFetching}
                            onClose={() => setQuery("")}
                            options={filteredRoles ?? []} 
                            onChange={(value) => setQuery(value)} 
                            displayValue={(item: FetchedRolesType) => item?.name} 
                            optionLabel={(option: FetchedRolesType) => option?.name} 
                            setSelected={(value: FetchedRolesType) => setFieldValue("role_id", value?.role_id)} 
                        />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Add Admin Account</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}