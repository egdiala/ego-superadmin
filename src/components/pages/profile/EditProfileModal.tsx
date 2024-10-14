import React, { useCallback } from "react";
import { Button, FileUpload, Input } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Icon } from "@iconify/react";
import type { FetchedAdminProfile } from "@/types/admin";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { editAdminProfileSchema } from "@/validations/admin";
import { useEditAdmin, useUploadProfilePhoto } from "@/services/hooks/mutations";

interface EditProfileModalProps {
    isOpen: boolean;
    user: FetchedAdminProfile;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, close, user }) => {
    const { mutate: upload, isPending: isUploading } = useUploadProfilePhoto(() => closeModal())
    const { mutate: edit, isPending } = useEditAdmin(() => closeModal())

    const { handleSubmit, dirty, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            phone_number: user?.phone_number || "",
            file: null as File | null
        },
        enableReinitialize: true,
        validationSchema: editAdminProfileSchema,
        onSubmit: () => {
            if (values?.file !== null) {
                const formData = new FormData();
                formData.append("file", values.file);
                upload(formData)
            } 
            if (values?.phone_number !== user?.phone_number) {
                edit({ id: user?.auth_id, phone_number: values?.phone_number }) 
            }
        },
    })

    const closeModal = useCallback(() => {
        resetForm()
        close(false);
    },[close, resetForm])

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="flex items-center justify-between">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Edit Profile
                        </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <div className="grid gap-6">
                        <Input type="text" label="Phone Number" {...register("phone_number")} />
                        <FileUpload label="Upload Profile Image" accept="image/*" value={values?.file?.name} onChange={(v) => setFieldValue("file", v)} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending || isUploading} disabled={isPending || isUploading || !isValid || !dirty} block>Update Profile</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}