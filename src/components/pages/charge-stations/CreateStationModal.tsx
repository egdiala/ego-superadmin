import React, { type ChangeEvent, DragEvent, Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { Loader } from "@/components/core/Button/Loader";
import { bulkCreateDriverSchema } from "@/validations/driver";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, RenderIf } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import type { AxiosProgressEvent } from "axios";
import { createStationSchema } from "@/validations/charge-station";
import { useBulkUploadStations, useCreateStation } from "@/services/hooks/mutations/useChargeStations";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

interface CreateStationModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: any) => void
}

const SingleStation: React.FC<CreateStationModalProps> = ({ close }) => {
    const { mutate: create, isPending } = useCreateStation(() => onClose())

    const { handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            station_name: "",
            contact_address: "",
            contact_number: "",
            lga_address: "",
            open_time: "",
            close_time: "",
        },
        validationSchema: createStationSchema,
        onSubmit: () => {
            const { open_time, close_time, ...rest } = values
            create({ ...rest, open_time: format(open_time, "HH:mm"), close_time: format(close_time, "HH:mm") })
        },
    })

    const onClose = () => {
        resetForm();
        close(false);
    }

    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6">
                <Input type="text" label="Station Name" {...register("station_name")} />
                <Input type="text" label="Full Address" {...register("contact_address")} />
                <Input type="text" label="Address LGA" {...register("lga_address")} />
                <Input type="text" label="Contact Phone" {...register("contact_number")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid">
                        <DatePicker
                            selected={values?.open_time as any}
                            onChange={(date) => setFieldValue("open_time", date)}
                            customInput={<Input type="text" iconRight="ph:timer-fill" label="Opening Time" />}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeFormat="p"
                            dateFormat="hh:mm"
                            required
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            selected={values?.close_time as any}
                            onChange={(date) => setFieldValue("close_time", date)}
                            customInput={<Input type="text" iconRight="ph:timer-fill" label="Closing Time" />}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="hh:mm"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Add Station</Button>
            </div>
        </form>
    )
}

const MultipleStations: React.FC<CreateStationModalProps> = ({ close }) => {
    const [progress, setProgress] = useState(0);
    const { mutate: upload, isPending: isUploading } = useBulkUploadStations(setProgress, (resData) => onClose(resData?.users_with_missing_field))

    const { handleSubmit, isValid, errors, setFieldValue, resetForm, values, setFieldError } = useFormikWrapper<{ files: File | string; }>({
        initialValues: {
            files: "",
        },
        validationSchema: bulkCreateDriverSchema,
        onSubmit(values) {
            const formData = new FormData();
            formData.append("files", values.files);

            upload({ files: formData, onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total as number));
                setProgress(percentCompleted);
            }})
        },
    })

    const prepareDoc = async(file: File) => {
        await setFieldValue("files", file, true);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        const file = files[0];
        if (file) {
            if (file.type === "text/csv" || file.name.endsWith(".csv")) {
                prepareDoc(file);
                setFieldError("files", undefined)
            } else {
                setFieldError("files", "Please upload a CSV file.");
            }
        }
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        const file = files?.[0];
        if (file) {
            if (file.type === "text/csv" || file.name.endsWith(".csv")) {
                prepareDoc(file);
                setFieldError("files", undefined) // Clear any previous errors
            } else {
                setFieldError("files", "Please upload a CSV file.");
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };

    const onClose = (v: any) => {
        resetForm();
        close(v);
    }
    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <div className="text-sm text-grey-dark-2">Please be sure to use the template document meant for this information.  <a download="bulk_create_charge_stations_template.csv" href="/bulk_create_charge_stations_template.csv" className="font-bold text-green-base underline underline-offset-1">Download here</a></div>
                <label onDrop={handleDrop} onDragOver={handleDragOver} htmlFor="files" className='w-full cursor-pointer py-12 border border-dashed border-[#D7D8D8] rounded-lg bg-green-4'>
                    <div className='grid gap-6 content-center justify-items-center w-full text-center mx-auto max-w-sm'>
                        <Icon icon="solar:cloud-upload-linear" className="size-14 text-grey-dark-3" />
                        <p className='text-sm text-neutral-base font-normal'>Drag & drop file here or<br/><span className='text-dark-green-1 font-semibold underline decoration-dark-green-1 underline-offset-2'>Select file</span></p>
                    </div>
                    <input id="files" type="file" accept=".csv" name="files" className="hidden" onChange={(e) => handleFileChange(e)} />
                </label>
                <AnimatePresence mode="wait">
                    {
                        !!errors?.files && (
                        <motion.span initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="text-semantics-error text-sm flex-1">
                            {errors?.files}
                        </motion.span>
                        )
                    }
                </AnimatePresence>
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
                <Button type="submit" theme="primary" loading={isUploading} disabled={isUploading || !isValid} block>Upload Stations</Button>
            </div>
        </form>
    )
}

export const CreateStationModal: React.FC<CreateStationModalProps> = ({ isOpen, close }) => {

    const categories = [
        {
            name: "Add a Single Station",
            element: SingleStation,
        },
        {
            name: "Add Multiple Stations",
            element: MultipleStations,
        }
    ]
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Add a New Charge Station
                    </DialogTitle>
                    <TabGroup as={Fragment}>
                        <TabList className="flex gap-4 border-b border-b-grey-dark-3">
                            {categories.map(({ name }) => (
                            <Tab key={name} className="px-2 text-sm font-semibold text-grey-dark-3 focus:outline-none data-[selected]:text-green-1 border-b-2 border-b-transparent data-[selected]:border-b-green-1 data-[focus]:outline-0">
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