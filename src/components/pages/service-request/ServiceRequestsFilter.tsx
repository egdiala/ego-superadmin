import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import { endOfMonth, format, parse, startOfMonth, startOfToday } from "date-fns";
import { Button, Checkbox, Input, RadioButton, RenderIf, TableAction } from "@/components/core";
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Radio, RadioGroup } from "@headlessui/react";

interface Filters {
    start_date: string;
    end_date: string;
    status: string;
}

interface ServiceRequestsFilterProps {
    // eslint-disable-next-line no-unused-vars
    setFilters: (v: Filters) => void;
    isLoading: boolean;
    theme?: string;
}

export const ServiceRequestsFilter: React.FC<ServiceRequestsFilterProps> = ({ isLoading, setFilters, theme = "secondary" }) => {
    const today = startOfToday();
    const [dateFilters, setDateFilters] = useState([
        {
            label: "Today",
            name: "today",
            value: { start: today, end: today },
        },
        {
            label: "This Month",
            name: "current_month",
            value: {
                start: startOfMonth(parse(format(today, "yyyy-MM-dd"), "yyyy-MM-dd", new Date())),
                end: endOfMonth(parse(format(today, "yyyy-MM-dd"), "yyyy-MM-dd", new Date())),
            },
        },
        { label: "All Time", name: "all", value: { start: "", end: "" } },
        { label: "Custom", name: "custom", value: { start: "", end: "" } },
    ]);

    const tripStatus = [
        { label: "Pending", name: "pending", value: "0" },
        { label: "Scheduled", name: "scheduled", value: "1" },
        { label: "In Progress", name: "in_progress", value: "2" },
        { label: "Completed", name: "completed", value: "3" },
        { label: "Rejected", name: "rejected", value: "4" },
    ]

    // const evFilters = [
    //     { label: "Lease", name: "lease" },
    //     { label: "Staff Commute", name: "staff_commute" },
    //     { label: "E-hailing", name: "e_hailing" },
    // ];

    const [selected, setSelected] = useState(dateFilters[2]);
    const [statusFilters, setStatusFilters] = useState("");
    // const [enabled, setEnabled] = useState<string | null>(null);

    const setCustomDate = (dates: { start: Date | string; end: Date | string }) => {
        const notCustom = dateFilters.filter((item) => item.name !== "custom") as any;
        setDateFilters([...notCustom, { label: "Custom", name: "custom", value: { start: dates.start, end: dates.end } }]);
    };

    const applyFilter = (fn?: () => void) => {
        setFilters({
            start_date: selected.value.start ? format(selected.value.start, "yyyy-MM-dd") : "",
            end_date: selected.value.end ? format(selected.value.end, "yyyy-MM-dd") : "",
            status: statusFilters
        });
        fn?.();
    };

    useEffect(() => {
        if (selected.name === "custom") {
            setSelected(dateFilters.filter((item) => item.name === "custom")?.at(0) as any)
        }
    },[dateFilters, selected.name])

    return (
        <Popover className="relative">
            <PopoverButton as={TableAction} theme={theme} block>
                <Icon icon="mdi:funnel" className="size-4" /> Filter
            </PopoverButton>
            <PopoverBackdrop className="fixed inset-0 bg-black/15 z-10" />
            <PopoverPanel
                as="section"
                transition
                anchor="bottom end"
                className="bg-white p-6 rounded origin-top-right flex flex-col gap-5 w-96 md:w-lg transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                {({ close }) => (
                    <Fragment>
                        <h1 className="font-bold text-xl text-grey-dark-1">Trip Filter</h1>
                        <div className="grid grid-cols-2 gap-5 md:gap-8">
                            {/* Date Filters */}
                            <div className="flex flex-col gap-1">
                                <span className="uppercase text-grey-dark-3 text-xs">Date</span>
                                <RadioGroup by={"name" as any} value={selected} onChange={setSelected} className="space-y-2">
                                    {dateFilters.map((item) => (
                                        <Radio
                                            value={item}
                                            key={item.name}
                                            className="group relative flex whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 text-grey-dark-2 transition duration-300 ease-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-3 data-[checked]:font-medium data-[checked]:text-dark-green-1"
                                        >
                                            <RadioButton name="date" checked={selected.name === item.name} />
                                            {item.label}
                                        </Radio>
                                    ))}
                                </RadioGroup>

                                {/* Custom Date Picker */}
                                <RenderIf condition={selected.name === "custom"}>
                                    <div className="relative grid gap-2">
                                        <DatePicker
                                            selected={dateFilters.find((item) => item.name === "custom")?.value.start as any}
                                            onChange={(date) =>
                                                setCustomDate({
                                                    start: date as Date,
                                                    end: dateFilters.find((item) => item.name === "custom")?.value.end as string | Date,
                                                })
                                            }
                                            customInput={<Input type="text" iconLeft="solar:calendar-bold" />}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <p className="uppercase text-sm text-[#225765]">To</p>
                                        <DatePicker
                                            selected={dateFilters.find((item) => item.name === "custom")?.value.end as any}
                                            onChange={(date) =>
                                                setCustomDate({
                                                    start: dateFilters.find((item) => item.name === "custom")?.value.start as string | Date,
                                                    end: date as Date,
                                                })
                                            }
                                            customInput={<Input type="text" iconLeft="solar:calendar-bold" />}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </div>
                                </RenderIf>
                            </div>

                            {/* Service Request Status Filters */}
                            <div className="flex flex-col gap-1">
                                <span className="uppercase text-grey-dark-3 text-xs">TRIP STATUS</span>
                                {tripStatus.map((item) => (
                                    <div
                                        key={item.label}
                                        role="button"
                                        onClick={() => setStatusFilters(statusFilters !== item.value ? item.value : "")}
                                        className={cn(
                                            "flex whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 transition duration-300 ease-out",
                                            statusFilters === item.value ? "bg-green-3 font-medium text-dark-green-1" : "text-grey-dark-2"
                                        )}
                                    >
                                        <Checkbox
                                            name={item.label.toLowerCase()}
                                            value={item.value}
                                            checked={statusFilters === item.value}
                                            onChange={() => setStatusFilters(statusFilters !== item.value ? item.value : "")}
                                        />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full max-w-80 ml-auto pt-10 flex items-center justify-end gap-4">
                            <CloseButton as={Button} theme="tertiary" block onClick={() => close()}>
                                Close
                            </CloseButton>
                            <Button
                                type="button"
                                theme="primary"
                                loading={isLoading}
                                disabled={isLoading}
                                block
                                onClick={() => applyFilter(close)}
                            >
                                Apply
                            </Button>
                        </div>
                    </Fragment>
                )}
            </PopoverPanel>
        </Popover>
    );
};
