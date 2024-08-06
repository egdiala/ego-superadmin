import React, { type ChangeEvent, Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import type { AxiosProgressEvent } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, RenderIf } from "@/components/core";
import { createVehicleSchema } from "@/validations/vehicles";
import { useBulkUploadVehicles, useCreateVehicle } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface AddVehicleModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

const SingleVehicle: React.FC<AddVehicleModalProps> = ({ close }) => {
    const { mutate: create, isPending } = useCreateVehicle(() => onClose())

    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            plate_no: "",
            model: "",
            year_manufacture: "",
            year_purchase: "",
            vehicle_color: "",
            vehicle_oem: "",
            vehicle_vin: "",
            chassis_no: "",
            engine_no: "",
            vehicle_imei: ""
        },
        validationSchema: createVehicleSchema,
        onSubmit(values) {
            const { year_manufacture, year_purchase, ...data } = values
            create({ ...data, year_manufacture: year_manufacture.toString(), year_purchase: year_purchase.toString() })
        },
    })

    const onClose = () => {
        resetForm();
        close(false);
    }

    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <Input type="text" label="Plate Number" {...register("plate_no")} />
                    <Input type="text" label="Model" {...register("model")} />
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <Input type="number" className="hide-number-input-arrows" inputMode="numeric" iconRight="mingcute:calendar-fill" label="Year of Manufacture" {...register("year_manufacture")} />
                    <Input type="number" className="hide-number-input-arrows" inputMode="numeric" iconRight="mingcute:calendar-fill" label="Purchase Year" {...register("year_purchase")} />
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <Input type="text" label="Color" {...register("vehicle_color")} />
                    <Input type="text" label="OEM" {...register("vehicle_oem")} />
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <Input type="text" label="Vehicle Identification Number (VIN)" {...register("vehicle_vin")} />
                    <Input type="text" label="Chassis Number" {...register("chassis_no")} />
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <Input type="text" label="Engine Number" {...register("engine_no")} />
                    <Input type="text" label="Dashcam IMEI (if available)" {...register("vehicle_imei")} />
                </div>
            </div>
            <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Add Vehicle</Button>
            </div>
        </form>
    )
}

const MultipleVehicles: React.FC<AddVehicleModalProps> = ({ close }) => {
    const [progress, setProgress] = useState(0);
    const { mutate: upload, isPending: isUploading } = useBulkUploadVehicles(setProgress, () => {})

    const { handleSubmit, isValid, setFieldValue, resetForm, values } = useFormikWrapper<{ files: File | string; }>({
        initialValues: {
            files: "",
        },
        // validationSchema: createDriverSchema,
        onSubmit(values) {
            const formData = new FormData();
            formData.append("files", values.files);

            upload({ files: formData, onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total as number));
                setProgress(percentCompleted);
            }})
        },
    })

    const prepareDoc = async(e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const files = target.files as FileList
        const file = files[0]
        await setFieldValue("files", file, true);
    }

    const onClose = () => {
        resetForm();
        close(false);
    }
    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <div className="text-sm text-grey-dark-2">Please be sure to use the template document meant for this information.  <a download="bulk_create_vehicles_template.csv" href="/bulk_create_vehicles_template.csv" className="font-bold text-green-base underline underline-offset-1">Download here</a></div>
                <label htmlFor="files" className='w-full cursor-pointer py-12 border border-dashed border-[#D7D8D8] rounded-lg bg-green-4'>
                    <div className='grid gap-6 content-center justify-items-center w-full text-center mx-auto max-w-sm'>
                        <Icon icon="solar:cloud-upload-linear" className="size-14 text-grey-dark-3" />
                        <p className='text-sm text-neutral-base font-normal'>Drag & drop file here or<br/><span className='text-dark-green-1 font-semibold underline decoration-dark-green-1 underline-offset-2'>Select file</span></p>
                    </div>
                    <input id="files" type="file" accept=".csv" name="files" className="hidden" onChange={(e) => prepareDoc(e)} />
                </label>
                <AnimatePresence mode="wait">
                    {
                        !!(values?.files as File)?.name && (
                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex w-full items-start gap-4 justify-between py-3 px-4 bg-grey-dark-4 rounded">
                            <span className="text-grey-dark-1 text-sm flex-1">{(values?.files as File)?.name}</span>
                            <RenderIf condition={isUploading}>
                            <div className="flex items-center gap-2">
                                <Loader className="spinner text-green-1" />
                                <span className="font-medium text-sm text-grey-dark-1">{progress}%</span>
                            </div>
                            </RenderIf>
                        </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                <Button type="submit" theme="primary" loading={isUploading} disabled={isUploading || !isValid} block>Upload Vehicles</Button>
            </div>
        </form>
    )
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, close }) => {

    const categories = [
        {
            name: "Add a Single Vehicle",
            element: SingleVehicle,
        },
        {
            name: "Add Multiple Vehicles",
            element: MultipleVehicles,
        }
    ]
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Add a New Vehicle
                    </DialogTitle>
                    <TabGroup as={Fragment}>
                        <TabList className="flex gap-4 border-b border-b-grey-dark-3">
                            {categories.map(({ name }) => (
                            <Tab key={name} className="p-0 text-sm font-semibold text-grey-dark-3 focus:outline-none data-[selected]:text-green-1 border-b-2 border-b-transparent data-[selected]:border-b-green-1 data-[focus]:outline-0">
                                {name}
                            </Tab>
                            ))}
                        </TabList>
                        <TabPanels as={Fragment}>
                            {categories.map((category, id) => {
                                const Component = category.element;

                                return ((
                                    <TabPanel key={id} className="grid gap-6">
                                        <Component isOpen={isOpen} close={close}  />
                                    </TabPanel>
                                ))
                            })}
                        </TabPanels>
                    </TabGroup>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}