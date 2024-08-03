import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { suspendDriverSchema } from "@/validations/driver";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, Input, TextArea, Toggle } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

interface SuspendDriverModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const SuspendDriverModal: React.FC<SuspendDriverModalProps> = ({ isOpen, close }) => {
    const { handleSubmit, isValid, register, resetForm, setFieldValue, values: suspendDriverValues } = useFormikWrapper({
        initialValues: {
            hour: "",
            mins: "",
            reason: "",
            time_of_day: "",
            reactivation_date_time: "",
            indefinite_suspension: false
        },
        validationSchema: suspendDriverSchema,
        onSubmit: () => {

        }
    })

    const closeModal = useCallback(() => {
        close(false);
        resetForm();
    },[close, resetForm])
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-scroll bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-5 justify-between w-full max-w-[30.625rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                                Suspend [Driver name]?
                            </DialogTitle>
                        <button type="button" onClick={closeModal} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>
                        <p className="text-grey-dark-3 text-sm">This action would suspend [Driver name] from this platform</p>
                    </div>
                    <TextArea placeholder="Reason" {...register("reason")} />
                    <div className="rounded-md border border-[#CDCEDA] py-3.5 px-3 flex items-center justify-between">
                        <span className="text-sm text-grey-dark-2">Indefinite Suspension</span>
                        <Toggle checked={suspendDriverValues.indefinite_suspension} onChange={(v) => setFieldValue("indefinite_suspension", v, true)} name="indefinite_suspension" />
                    </div>
                    <AnimatePresence mode="sync">
                        {
                            !suspendDriverValues.indefinite_suspension && (
                                <motion.div initial={{ height: "0px", opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: "0px", opacity: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex flex-col gap-4 items-end overflow-x-visible overflow-y-clip">
                                <Input label="Re-activation date & Time" type="date" {...register("reactivation_date_time")} />
                                <div className="flex items-start gap-4">
                                    <Input label="Hour" type="text" placeholder="HH" {...register("hour")} />
                                    <Input label="Mins" type="text" placeholder="MM" {...register("mins")} />
                                    <Input label="Time of the day" type="text" placeholder="PM" {...register("time_of_day")} />
                                </div>      
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    <div className="flex items-center justify-end w-full md:w-2/3 ml-auto pt-10 gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={closeModal} block>Cancel</Button>
                        <Button type="submit" theme="primary" disabled={!isValid} block>Suspend</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}