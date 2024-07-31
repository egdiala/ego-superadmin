import React, { Fragment } from "react";
import { Button, Input, SelectInput } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Loader } from "@/components/core/Button/Loader";
import { Icon } from "@iconify/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { createDriverSchema } from "@/validations/driver";
import { useCreateDriver } from "@/services/hooks/mutations";

interface CreateDriverModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

const SingleDriver: React.FC<CreateDriverModalProps> = ({ close }) => {
    const { mutate: create, isPending } = useCreateDriver()
    const genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
    ]

    const { handleSubmit, isValid, register, resetForm } = useFormikWrapper({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            gender: "",
            nin: "",
            driver_license: ""
        },
        validationSchema: createDriverSchema,
        onSubmit(values) {
            create(values)
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
                <Input type="text" label="Email" {...register("email")} />
                {/* <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <Input type="text" label="Upload Driver’s License" optional />
                    <Input type="text" label="Upload Profile Image" />
                </div> */}
            </div>
            <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                <Button type="button" theme="tertiary" onClick={onClose} block>Cancel</Button>
                <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Add Driver</Button>
            </div>
        </form>
    )
}

const MultipleDrivers: React.FC<CreateDriverModalProps> = ({ close }) => {
    return (
        <Fragment>
            <div className="grid gap-4">
                <div className="text-sm text-grey-dark-2">Please be sure to use the template document meant for this information.  <span className="font-bold text-green-base underline underline-offset-1">Download here</span></div>
                <label htmlFor="dropzone-file" className='w-full cursor-pointer py-12 border border-dashed border-[#D7D8D8] rounded-lg bg-green-4'>
                    <div className='grid gap-6 content-center justify-items-center w-full text-center mx-auto max-w-sm'>
                        <Icon icon="solar:cloud-upload-linear" className="size-14 text-grey-dark-3" />
                        <p className='text-sm text-neutral-base font-normal'>Drag & drop file here or<br/><span className='text-dark-green-1 font-semibold underline decoration-dark-green-1 underline-offset-2'>Select file</span></p>
                    </div>
                    <input name='file' id="dropzone-file" type="file" accept=".doc,.docx,.pdf" className="hidden" />
                </label>
                <div className="flex w-full items-center justify-between py-3 px-4 bg-grey-dark-4 rounded">
                    <span className="text-grey-dark-1 text-sm flex-1">File name</span>
                    <div className="flex items-center gap-2">
                        <Loader className="spinner text-green-1" />
                        <span className="font-medium text-sm text-grey-dark-1">40%</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end w-full md:w-1/2 ml-auto pt-10 gap-2 md:gap-4">
                <Button theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                <Button theme="primary" block>Upload Drivers</Button>
            </div>
        </Fragment>
    )
}

export const CreateDriverModal: React.FC<CreateDriverModalProps> = ({ isOpen, close }) => {

    const categories = [
        {
            name: "Add a Single driver",
            element: SingleDriver,
        },
        {
            name: "Add Multiple Drivers",
            element: MultipleDrivers,
        }
    ]
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Add a New Driver
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