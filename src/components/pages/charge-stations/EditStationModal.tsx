import React from "react";
import DatePicker from "react-datepicker";
import { Button, Input } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { createStationSchema } from "@/validations/charge-station";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedChargeStations } from "@/types/charge-stations";
import { useEditStation } from "@/services/hooks/mutations/useChargeStations";


interface EditStationModalProps {
    isOpen: boolean;
    close: () => void
    station: FetchedChargeStations | null
}

export const EditStationModal: React.FC<EditStationModalProps> = ({ isOpen, close, station }) => {
    const { mutate, isPending } = useEditStation(`${station?.station_name} edited successfully`, () => onClose())

    const { handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            station_name: station?.station_name || "",
            contact_address: station?.full_address || "",
            contact_number: station?.contact_number || "",
            lga_address: station?.lga_address || "",
            open_time: station?.opening_time || "",
            close_time: station?.closing_time || "",
        },
        enableReinitialize: true,
        validationSchema: createStationSchema,
        onSubmit: () => {
            mutate({ id: station?.station_id as string, ...values })
        },
    })

    const onClose = () => {
        resetForm();
        close();
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Edit Charge Station
                    </DialogTitle>
                    <div className="grid gap-6">
                        <Input type="text" label="Station Name" {...register("station_name")} />
                        <Input type="text" label="Full Address" {...register("contact_address")} />
                        <Input type="text" label="Address LGA" {...register("lga_address")} />
                        <Input type="text" label="Contact Phone" {...register("contact_number")} />
                        <div className="grid grid-cols-2 gap-6">
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
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>Update</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}