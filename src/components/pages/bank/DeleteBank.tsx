import React from "react";
import caution from "@/assets/caution.gif";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedFeeBank } from "@/types/banks";
import { useDeleteBank } from "@/services/hooks/mutations";

interface DeleteBankModalProps {
    isOpen: boolean;
    close: () => void
    bank: FetchedFeeBank | null
}

export const DeleteBankModal: React.FC<DeleteBankModalProps> = ({ isOpen, close, bank }) => {
    const { mutate, isPending } = useDeleteBank(() => close())
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-4 justify-between w-full md:max-w-[21.875rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full data-[closed]:opacity-0">
                    <img src={caution} alt="caution" className="size-12" />
                    <div className="grid gap-1">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1 capitalize">
                            Delete {bank?.bank_name}, {bank?.account_number}?
                        </DialogTitle>
                        <p className="text-grey-dark-3 text-sm">This action would remove <span className="capitalize">{bank?.bank_name}, {bank?.account_number}</span> from this platform and is irreversible.</p>
                    </div>
                    <div className="flex items-center w-full gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={close} block>Cancel</Button>
                        <Button type="button" theme="primary" loading={isPending} disabled={isPending} onClick={() => mutate(bank?.feebank_id as string)} block>Delete</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}