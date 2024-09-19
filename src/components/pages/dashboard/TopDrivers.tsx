import React, { Fragment, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import blankImg from "@/assets/blank.svg";
import type { TopDriversType } from "@/types/drivers";
import { formattedNumber } from "@/utils/textFormatter";
import { Loader } from "@/components/core/Button/Loader";
import { Button, EmptyState, RadioButton, RenderIf, TableAction } from "@/components/core";
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Radio, RadioGroup } from "@headlessui/react";

interface TopDriversDashboardProps {
    data: TopDriversType[]
    [key: PropertyKey]: any
}

export const TopDrivers: React.FC<TopDriversDashboardProps> = ({ className, data, filters, setFilters }) => {

    const requestTypeFilters = useMemo(() => {
        return [
            {
                label: "Trips",
                value: "trip",
            },
            {
                label: "Revenue",
                value: "revenue",
            },
        ]
    },[]);

    const [selected, setSelected] = useState(requestTypeFilters.find((item) => item?.value === filters?.request_type))

    const applyFilter = (fn?: () => void) => {
        setFilters({
            request_type: selected?.value,
        });
        fn?.();
    };
    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 font-semibold text-xl">Top Drivers</h1>
                <Popover className="relative">
                    <PopoverButton as={TableAction} theme="ghost" block>
                        <Icon icon="mdi:funnel" className="size-4" />
                        By {selected?.label}
                        <Icon icon="ph:caret-down" className="size-4" />
                    </PopoverButton>
                    <PopoverBackdrop className="fixed inset-0 bg-black/15 z-10" />
                    <PopoverPanel
                        as="section"
                        transition
                        anchor="bottom end"
                        className="bg-white p-6 rounded origin-top-right flex flex-col gap-5 w-80 transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        {({ close }) => (
                            <Fragment>
                                <h1 className="font-bold text-xl text-grey-dark-1">Filter</h1>
                                <div className="grid gap-5 md:gap-8">
                                    {/* Date Filters */}
                                    <div className="flex flex-col gap-1">
                                        <span className="uppercase text-grey-dark-3 text-xs">Request Type</span>
                                        <RadioGroup by={"value" as any} value={selected} onChange={setSelected} className="flex items-center gap-2">
                                            {requestTypeFilters.map((item) => (
                                                <Radio
                                                    value={item}
                                                    key={item.value}
                                                    className="group relative flex flex-1 whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 text-grey-dark-2 transition duration-300 ease-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-3 data-[checked]:font-medium data-[checked]:text-dark-green-1"
                                                >
                                                    <RadioButton name="date" checked={selected?.value === item.value} />
                                                    {item.label}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="pt-5 flex items-center gap-4">
                                    <CloseButton as={Button} theme="tertiary" block onClick={() => close()}>
                                        Close
                                    </CloseButton>
                                    <Button
                                        type="button"
                                        theme="primary"
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
            </div>
            <RenderIf condition={data?.length > 0}>
            <div className="grid gap-5">
                {
                    data?.map((driver, id) =>
                        <div key={id} className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-grey-dark-1">{id + 1}.</span>
                                <img src={driver?.user_data?.avatar || blankImg} alt={driver?.user_data?.first_name ?? `user-${id}`} className="object-cover object-center size-7 rounded-full" />
                                <span className="text-sm text-grey-dark-2">{driver?.user_data?.first_name ?? ""} {driver?.user_data?.last_name ?? ""}</span>
                            </div>
                            <span className="text-sm text-grey-dark-1">{filters?.request_type === "trip" ? driver?.total : formattedNumber(driver?.total)}</span>
                        </div>
                    )
                }
            </div>
            </RenderIf>
            <RenderIf condition={data?.length === 0}>
                <EmptyState emptyStateText="We couldn't find any top drivers" />
            </RenderIf>
            <RenderIf condition={data === undefined}>
                <div className="flex w-full h-56 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </div>
    )
}