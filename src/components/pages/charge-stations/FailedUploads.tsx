import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Table } from "@/components/core";

interface FailedStationUploadsModalProps {
    isOpen: boolean;
    data: any[];
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const FailedStationUploadsModal: React.FC<FailedStationUploadsModalProps> = ({ isOpen, close, data }) => {

    const columns = [
        {
            header: () => "Name",
            accessorKey: "station_name",
        },
        {
            header: () => "Address",
            accessorKey: "address",
        },
        {
            header: () => "Contact Phone",
            accessorKey: "contact_number",
        },
        {
            header: () => "LGA Address",
            accessorKey: "lga",
        },
        {
            header: () => "Message",
            accessorKey: "message",
        },
    ];
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-4 justify-between w-full md:max-w-7xl rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full data-[closed]:opacity-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Stations Not Uploaded
                        </DialogTitle>
                        <button type="button" onClick={() => close(false)} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-light-green rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                    </div>
                    <Table
                        columns={columns}
                        data={data}
                        totalCount={data?.length}
                        paginateData={false}
                        onPageChange={() => {}}
                    />
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}