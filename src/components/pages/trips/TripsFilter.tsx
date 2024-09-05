import React, { useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { Button, Checkbox, RadioButton, TableAction } from "@/components/core";
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Radio, RadioGroup } from "@headlessui/react";

export const TripsFilter: React.FC = () => {
    const dateFilters = [
        { label: "Today", value: "today" },
        { label: "This Month", value: "current_month" },
        { label: "All Time", value: "all" },
        { label: "Custom", value: "custom" },
    ]
    const evFilters = [
        { label: "Lease", value: "today" },
        { label: "Staff Commute", value: "current_month" },
        { label: "E-hailing", value: "all" },
    ]
    const [selected, setSelected] = useState(dateFilters[2])
    const [enabled, setEnabled] = useState<boolean | string | null>(null)
    return (
        <Popover className="relative">
            <PopoverButton as={TableAction} theme="grey" block><Icon icon="mdi:funnel" className="size-4" />Filter</PopoverButton>
            <PopoverBackdrop className="fixed inset-0 bg-black/15 z-10" />
            <PopoverPanel as="section" transition anchor="bottom end" className="bg-white p-6 rounded origin-top-right flex flex-col gap-5 w-[39.375rem] transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
                <h1 className="font-bold text-xl text-grey-dark-1">Trip Filter</h1>
                <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col gap-1">
                        <span className="uppercase text-grey-dark-3 text-xs">Date</span>
                        <RadioGroup by={"value" as any} value={selected} onChange={setSelected} aria-label="Server size" className="space-y-2">
                        {dateFilters.map((item) => (
                            <Radio
                                value={item}
                                key={item.value}
                                className="group relative flex items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 text-grey-dark-2 transition duration-300 ease-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-3 data-[checked]:font-medium data-[checked]:text-dark-green-1"
                            >
                                <RadioButton name="date" checked={selected.value === item.value} />
                                {item.label}
                            </Radio>
                        ))}
                        </RadioGroup>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="uppercase text-grey-dark-3 text-xs">EV Purchase Model</span>
                        {
                            evFilters.map((item) =>
                                <div role="button" onClick={() => setEnabled(item.value)} className={cn("flex items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 transition duration-300 ease-out", enabled === item.value ? "bg-green-3 font-medium text-dark-green-1" : "text-grey-dark-2")}>
                                    <Checkbox name={item.label.toLowerCase()} value={item.value} checked={enabled === item.value} onChange={() => setEnabled(item.value)} />
                                    {item.label}
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="uppercase text-grey-dark-3 text-xs">Trip Status</span>
                    </div>
                </div>
                <div className="w-full max-w-80 ml-auto pt-10 flex items-center justify-end gap-4">
                    <CloseButton as={Button} theme="tertiary" block>Close</CloseButton>
                    <Button theme="primary" block>Apply</Button>
                </div>
            </PopoverPanel>
        </Popover>
    )
}