import React, { useState } from "react";
import { Button, Input, RenderIf, SelectInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ComboBox } from "@/components/core/ComboBox";
import { useGetAdmin, useGetRoles } from "@/services/hooks/queries";
import { useEditAdmin } from "@/services/hooks/mutations";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { createAdminSchema } from "@/validations/admin";
import type { FetchedRolesType } from "@/types/roles";
import { Loader } from "@/components/core/Button/Loader";
import type { FetchedAdminType } from "@/types/admin";


interface EditAdminModalProps {
    isOpen: boolean;
    admin: FetchedAdminType;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const EditAdminModal: React.FC<EditAdminModalProps> = ({ admin, isOpen, close }) => {
    const [query, setQuery] = useState("")
    const { data: roles, isFetching } = useGetRoles()
    const { mutate: edit, isPending } = useEditAdmin(() => onClose())
    const { data: fetchedAdmin, isFetching: isFetchingAdmin } = useGetAdmin(admin?.auth_id)
    const genders = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }]

    const filteredRoles =
        query === ""
        ? roles
        : roles?.filter((role) => {
            return role.name.toLowerCase().includes(query.toLowerCase())
            })

    const { handleSubmit, isValid, register, resetForm, setFieldValue } = useFormikWrapper({
        initialValues: {
            first_name: fetchedAdmin?.first_name || "",
            last_name: fetchedAdmin?.last_name || "",
            email: fetchedAdmin?.email || "",
            phone_number: fetchedAdmin?.phone_number || "",
            gender: "",
            role_id: ""
        },
        enableReinitialize: true,
        validationSchema: createAdminSchema,
        onSubmit(values) {
            edit({ id: admin?.auth_id, ...values })
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
                        Edit Admin Account
                    </DialogTitle>
                    <RenderIf condition={isFetchingAdmin}>
                        <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                    </RenderIf>
                    <RenderIf condition={!isFetchingAdmin}>
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
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Update</Button>
                    </div>
                    </RenderIf>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}