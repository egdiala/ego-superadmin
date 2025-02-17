import React from "react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FetchedPayout } from "@/types/payment";

interface ConfirmationModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
    payoutId: FetchedPayout | null;
    // eslint-disable-next-line no-unused-vars
    approve: (payout_id: string, status?: "1" | "2") => void
    // eslint-disable-next-line no-unused-vars
    process: (payout_id: string, status?: "1" | "2") => void
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ approve, process, isOpen, close, payoutId }) => {
    const approveOrProcess = () => {
        if (payoutId?.approve_status === 0) {
            approve(payoutId?.payout_id as string, "1")
        } else {
            process(payoutId?.payout_id as string, "2")
        }
    }
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-4 justify-between w-full md:max-w-[21.875rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full data-[closed]:opacity-0">
                    <img src={caution} alt="caution" className="size-12" />
                    <div className="grid gap-1">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            {payoutId?.approve_status === 0 ? "Approve" : "Reinitiate"}?
                        </DialogTitle>
                        <p className="text-grey-dark-2 text-sm">This action will {payoutId?.approve_status === 0 ? "approve" : "reinitiate"} this disbursement</p>
                    </div>
                    <div className="flex items-center w-full gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                        <Button type="submit" theme="primary" onClick={() => approveOrProcess()} block>{payoutId?.approve_status === 0 ? "Approve" : "Reinitiate"}</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}