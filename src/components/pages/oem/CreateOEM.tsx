import React from "react";
import DatePicker from "react-datepicker";
import { createOEMSchema } from "@/validations/oem";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useCreateOEM, useUploadOEMPicture } from "@/services/hooks/mutations";
import { Button, FileUpload, Input } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CreateOEMModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const CreateOEMModal: React.FC<CreateOEMModalProps> = ({ isOpen, close }) => {
    const { mutate: upload, isPending: isUploading } = useUploadOEMPicture(() => onClose())
    const { mutate: create, isPending } = useCreateOEM((data) => {
        if (values?.file !== null) {
            const formData = new FormData();
            formData.append("file", values.file);
            upload({ oem_id: data.oem_id, model_id: data.model_id, file: formData })
        }
    })

    const { errors, handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            oem_name: "",
            model: "",
            year: "" as unknown as Date | any,
            file: null as File | null,
        },
        validationSchema: createOEMSchema,
        onSubmit(values) {
            create({ oem_name: values.oem_name, model_data: { model: values.model, year: values.year }})
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
                        Add New OEM
                    </DialogTitle>
                    <div className="grid gap-6">
                        <Input type="text" label="OEM Name" {...register("oem_name")} />
                        <div className="grid grid-cols-1 md:grid-cols-2 content-start gap-6">
                            <div className="grid mt-0.5">
                                <Input type="text" label="Model" {...register("model")} />
                            </div>
                            
                            <div className="grid">
                                <DatePicker
                                    selected={values.year}
                                    onChange={(date) => setFieldValue("year", date?.getFullYear()?.toString())}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    customInput={<Input type="text" inputMode="numeric" iconRight="mingcute:calendar-fill" label="Year of Manufacture" error={errors?.year as string} />}
                                />
                            </div>
                        </div>
                        <FileUpload label="Upload Vehicle image (500kb max)" accept="image/*" error={errors?.file} value={values?.file?.name} onChange={(v) => setFieldValue("file", v)} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || isUploading || !isValid} block>Add OEM</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}