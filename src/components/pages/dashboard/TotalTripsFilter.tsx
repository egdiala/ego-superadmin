import React, { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import { format, getYear, parseISO } from "date-fns";
import { Button, Input, TableAction } from "@/components/core";
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";

interface Filters {
    start_date: string;
    end_date: string;
}

interface TotalTripsFilterProps {
    // eslint-disable-next-line no-unused-vars
    setFilters: (v: Filters) => void;
    filters: Filters;
    isLoading: boolean;
    theme?: string;
}

export const TotalTripsFilter: React.FC<TotalTripsFilterProps> = ({ isLoading, setFilters, filters, theme = "ghost" }) => {
    const [dateFilters, setDateFilters] = useState(getYear(filters?.start_date));


    const applyFilter = (fn?: () => void) => {
        setFilters({
            start_date: `${dateFilters}-01-01`,
            end_date: dateFilters === new Date().getFullYear() ? format(new Date(), "yyyy-MM-dd") : `${dateFilters}-12-31`,
        });
        fn?.();
    };

    return (
        <Popover className="relative">
            <PopoverButton as={TableAction} theme={theme} block>
                <Icon icon="mdi:funnel" className="size-4" /> Filter: <strong>{dateFilters}</strong>
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
                        <div className="grid grid-cols-1 gap-5 md:gap-8">
                            {/* Date Filters */}
                            <div className="flex flex-col gap-1">
                                <span className="uppercase text-grey-dark-3 text-xs">Date</span>

                                {/* Custom Date Picker */}
                                <div className="relative grid gap-2">
                                    <DatePicker
                                        selected={parseISO(dateFilters.toString())}
                                        onChange={(date) => setDateFilters(date?.getFullYear() as number)}
                                        customInput={<Input type="text" iconLeft="solar:calendar-bold" />}
                                        maxDate={new Date()}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-32 flex items-center justify-end gap-4">
                            <CloseButton as={Button} theme="tertiary" block onClick={() => close()}>
                                Close
                            </CloseButton>
                            <Button
                                type="button"
                                theme="primary"
                                loading={isLoading}
                                disabled={isLoading || (getYear(filters?.start_date) === dateFilters)}
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
