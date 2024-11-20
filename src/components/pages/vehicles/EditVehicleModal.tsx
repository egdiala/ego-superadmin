import React, { useEffect, useMemo } from "react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, SelectInput } from "@/components/core";
import { createVehicleSchema } from "@/validations/vehicles";
import { useEditVehicle } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { useGetOEMs } from "@/services/hooks/queries";
import { FetchedVehicleType } from "@/types/vehicles";

interface AddVehicleModalProps {
    isOpen: boolean;
    vehicle: FetchedVehicleType;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const EditVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, close, vehicle }) => {
    const { data } = useGetOEMs()
    const { mutate: edit, isPending } = useEditVehicle(() => onClose())

    const { dirty, errors, handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            plate_no: vehicle?.plate_number || "",
            oem_vehicle: vehicle?.oem_vehdata?.model_id || "",
            year_manufacture: vehicle?.year_manufacture || "" as unknown as Date | any,
            year_purchase: vehicle?.year_purchase || "" as unknown as Date | any,
            vehicle_color: vehicle?.car_color || "",
            oem_id: vehicle?.oem_vehdata?.oem_id || "",
            vehicle_vin: vehicle?.car_vin || "",
            chassis_no: vehicle?.chassis_number || "",
            engine_no: vehicle?.engine_number || "",
            vehicle_imei: vehicle?.car_imei || ""
        },
        enableReinitialize: true,
        validationSchema: createVehicleSchema,
        onSubmit(values) {
            const { year_manufacture, year_purchase, ...data } = values
            edit({ ...data, year_manufacture: year_manufacture.toString(), year_purchase: year_purchase.toString(), id: vehicle?.vehicle_id })
        },
    })

    const oems = useMemo(() => {
        if (data === undefined) {
            return []
        }
        return data?.map((item) => ({ label: item?.oem_name, value: item?.oem_id }))
    },[data])

    const models = useMemo(() => {
        const selectedOem = data?.find((item) => item?.oem_id === values?.oem_id)

        return selectedOem?.model_data?.map((item) => ({ label: item?.model, value: item?._id }))
    },[data, values?.oem_id])

    useEffect(() => {
        if (values?.oem_id && values?.oem_vehicle) {
            const selectedOem = data?.find((item) => item?.oem_id === values?.oem_id)
            const year = selectedOem?.model_data?.find((item) => item?._id === values?.oem_vehicle)
            setFieldValue("year_manufacture", year?.year)
        }
    },[values?.oem_vehicle, values?.oem_id, data, setFieldValue])

    const onClose = () => {
        resetForm();
        close(false);
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-6 justify-between w-full max-w-[39.375rem] rounded bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                        Edit Vehicle
                    </DialogTitle>
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <SelectInput options={oems} label="OEM" {...register("oem_id")} />
                                <SelectInput options={models ?? []} label="Model" {...register("oem_vehicle")} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid grid-cols-1">
                                    <DatePicker
                                        selected={values.year_manufacture}
                                        onChange={(date) => setFieldValue("year_manufacture", date?.getFullYear()?.toString())}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        customInput={<Input type="text" inputMode="numeric" iconRight="mingcute:calendar-fill" label="Year of Manufacture" error={errors?.year_manufacture as string} />}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <DatePicker
                                        selected={values.year_purchase}
                                        onChange={(date) => setFieldValue("year_purchase", date?.getFullYear()?.toString())}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        customInput={<Input type="text" inputMode="numeric" iconRight="mingcute:calendar-fill" label="Purchase Year" error={errors?.year_purchase as string} />}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <Input type="text" label="Color" {...register("vehicle_color")} />
                                <Input type="text" label="Plate Number" {...register("plate_no")} />
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
                            <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid || !dirty} block>Edit Vehicle</Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}