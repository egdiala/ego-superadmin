import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import type { FetchedDriverType } from "@/types/drivers";
import { suspendDriverSchema } from "@/validations/driver";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, RenderIf, SelectInput, TextArea, Toggle } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useUpdateUserStatus } from "@/services/hooks/mutations";

interface SuspendDriverModalProps {
    isOpen: boolean;
    driver: FetchedDriverType;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const SuspendDriverModal: React.FC<SuspendDriverModalProps> = ({ isOpen, close, driver }) => {
    const { mutate, isPending } = useUpdateUserStatus(`Driver ${driver?.suspension_status === 0 ? "Suspended" : "Unsuspended"} Successfully!`, () => closeModal())
    const { handleSubmit, isValid, register, resetForm, setFieldValue, values: suspendDriverValues } = useFormikWrapper({
        initialValues: {
            hour: "",
            mins: "",
            reason: "",
            time_of_day: "",
            unsuspend_date: "",
            suspend_indefinite: true
        },
        validationSchema: suspendDriverSchema,
        onSubmit(values) {
            const { hour, mins, time_of_day, suspend_indefinite, unsuspend_date, ...rest } = values
            if (!suspend_indefinite) {
                mutate({ auth_id: driver?.driver_id, user_type: "driver", unsuspend_date, suspend_indefinite: suspend_indefinite ? "1" : "0",  unsuspend_time: `${hour}:${mins}${time_of_day}`, status: driver?.status === 1 ? "2" : "1", suspension_status: driver?.suspension_status === 0 ? "1" : "0", ...rest })
            } else {
                mutate({ auth_id: driver?.driver_id, user_type: "driver", suspend_indefinite: suspend_indefinite ? "1" : "0", status: driver?.status === 1 ? "2" : "1", suspension_status: driver?.suspension_status === 0 ? "1" : "0", ...rest })
            }
            
        }
    })

    const closeModal = useCallback(() => {
        close(false);
        resetForm();
    }, [close, resetForm])
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-5 justify-between w-full max-w-[30.625rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                                {driver?.suspension_status === 0 ? "Suspend" : "Unsuspend"} {driver?.first_name} {driver?.last_name}?
                            </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>
                        <p className="text-grey-dark-3 text-sm">This action would {driver?.suspension_status === 0 ? "suspend" : "unsuspend"} {driver?.first_name} {driver?.last_name} from this platform</p>
                    </div>
                    <TextArea placeholder="Reason" {...register("reason")} />
                    <RenderIf condition={driver?.suspension_status === 0}>
                        <div className="rounded-md border border-[#CDCEDA] py-3.5 px-3 flex items-center justify-between">
                            <span className="text-sm text-grey-dark-2">Indefinite Suspension</span>
                            <Toggle checked={suspendDriverValues.suspend_indefinite} onChange={(v) => setFieldValue("suspend_indefinite", v)} name="suspend_indefinite" />
                        </div>
                        <AnimatePresence>
                            {
                                !suspendDriverValues.suspend_indefinite ? (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col gap-4 justify-end items-end overflow-x-visible overflow-y-clip pb-1">
                                        <Input label="Re-activation date & Time" type="date" min={new Date().toJSON().slice(0, 10)} {...register("unsuspend_date")} />
                                        <div className="flex items-start gap-4">
                                            <Input label="Hour" type="text" inputMode="numeric" placeholder="HH" {...register("hour")} />
                                            <Input label="Mins" type="text" inputMode="numeric" placeholder="MM" {...register("mins")} />
                                            <SelectInput label="Time of the day" options={[{ label: "AM", value: "AM" }, { label: "PM", value: "PM" }]} placeholder="PM" {...register("time_of_day")} />
                                        </div>      
                                    </motion.div>
                                ) : null
                            }
                        </AnimatePresence>
                    </RenderIf>
                    <div className="flex items-center justify-end w-full md:w-2/3 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>{driver?.suspension_status === 0 ? "Suspend" : "Unsuspend"}</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}