import React from "react";
import DatePicker from "react-datepicker";
import { updateModelSchema } from "@/validations/oem";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useUpdateModel, useUploadOEMPicture } from "@/services/hooks/mutations";
import { Button, FileUpload, Input } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FetchedOEMType } from "@/types/oem";

interface CreateModelModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
    modelId: string;
    model: FetchedOEMType["model_data"][0]
    oemId: string;
}

export const CreateModelModal: React.FC<CreateModelModalProps> = ({ isOpen, close, modelId, oemId, model }) => {
    const { mutate: upload, isPending: isUploading } = useUploadOEMPicture(() => onClose())
    const { mutate: update, isPending } = useUpdateModel((data) => {
        if ((values?.file as File)?.name) {
            const formData = new FormData();
            formData.append("file", values.file as File);
            upload({ oem_id: oemId, model_id: modelId || data?.model_id, file: formData })
        } else {
            onClose()
        }
    })

    const { errors, handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            model: model?.model || "",
            year: model?.year || "" as unknown as Date | any,
            file: model?.avatar || null as File | null,
        },
        validationSchema: updateModelSchema,
        enableReinitialize: true,
        onSubmit(values) {
            update({ oem_id: oemId, model_data: { model: values.model, year: values.year }, ...((modelId || model?._id) ? ({model_id: (modelId || model?._id)}) : {})})
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
                        {model?._id ? "Edit Model" : "Add New OEM"}
                    </DialogTitle>
                    <div className="grid gap-6">
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
                        <FileUpload label="Upload Vehicle image (500kb max)" accept="image/*" error={errors?.file} value={(values?.file as File)?.name} onChange={(v) => setFieldValue("file", v)} />
                    </div>
                    <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || isUploading || !isValid} block>{model?._id ? "Edit Model" : "Add OEM"}</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}