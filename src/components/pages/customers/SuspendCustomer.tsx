import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { suspendDriverSchema } from "@/validations/driver";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { FetchedOrgaizationType } from "@/types/organizations";
import { useSuspendOrganization } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button, Input, SelectInput, TextArea, Toggle } from "@/components/core";

interface SuspendCustomerModalProps {
    isOpen: boolean;
    customer: FetchedOrgaizationType;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const SuspendCustomerModal: React.FC<SuspendCustomerModalProps> = ({ isOpen, close, customer }) => {
    const { mutate, isPending } = useSuspendOrganization(`Customer ${customer?.status === 1 ? "Suspended" : "Unsuspended"} Successfully!`, () => closeModal())
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
                mutate({ auth_id: customer?.organization_id, unsuspend_date, suspend_indefinite: suspend_indefinite ? "1" : "0",  unsuspend_time: `${hour}:${mins}${time_of_day}`, status: customer?.status === 1 ? "2" : "1", ...rest })
            } else {
                mutate({ auth_id: customer?.organization_id, suspend_indefinite: suspend_indefinite ? "1" : "0", status: customer?.status === 1 ? "2" : "1", ...rest })
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
                                {customer?.status === 1 ? "Suspend" : "Unsuspend"} {customer?.name}?
                            </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>
                        <p className="text-grey-dark-3 text-sm">This action would {customer?.status === 1 ? "suspend" : "unsuspend"} {customer?.name} from this platform</p>
                    </div>
                    <TextArea placeholder="Reason" {...register("reason")} />
                    <div className="rounded-md border border-[#CDCEDA] py-3.5 px-3 flex items-center justify-between">
                        <span className="text-sm text-grey-dark-2">Indefinite Suspension</span>
                        <Toggle checked={suspendDriverValues.suspend_indefinite} onChange={(v) => setFieldValue("suspend_indefinite", v)} name="suspend_indefinite" />
                    </div>
                    <AnimatePresence>
                        {
                            !suspendDriverValues.suspend_indefinite && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col gap-4 justify-end items-end overflow-x-visible overflow-y-clip pb-1">
                                <Input label="Re-activation date & Time" type="date" min={new Date().toJSON().slice(0, 10)} {...register("unsuspend_date")} />
                                <div className="flex items-start gap-4">
                                    <Input label="Hour" type="text" inputMode="numeric" placeholder="HH" {...register("hour")} />
                                    <Input label="Mins" type="text" inputMode="numeric" placeholder="MM" {...register("mins")} />
                                    <SelectInput label="Time of the day" options={[{ label: "AM", value: "AM" }, { label: "PM", value: "PM" }]} placeholder="PM" {...register("time_of_day")} />
                                </div>      
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    <div className="flex items-center justify-end w-full md:w-2/3 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid} block>{customer?.status === 1 ? "Suspend" : "Unsuspend"}</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}