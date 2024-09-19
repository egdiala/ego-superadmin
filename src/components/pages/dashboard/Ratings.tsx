import React, { Fragment, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Button, RadioButton, TableAction } from "@/components/core";
import type { FetchedRatingCountOne } from "@/types/ratings";
import { CloseButton, Popover, PopoverBackdrop, PopoverButton, PopoverPanel, Radio, RadioGroup } from "@headlessui/react";

interface RatingsDashboardProps {
    data: FetchedRatingCountOne[];
    [key: PropertyKey]: any
}

export const Ratings: React.FC<RatingsDashboardProps> = ({ className, data, filters, setFilters }) => {
    const ratings = useMemo(() => {
        // Initialize a map with all ratings from 1 to 5 set to 0
        const ratingsMap = new Map<number, number>([
            [5, 0],
            [4, 0],
            [3, 0],
            [2, 0],
            [1, 0],
        ]);

        // Update the map with the existing ratings data
        data.forEach(item => {
            ratingsMap.set(item.rating, item.total);
        });

        // Convert the map back into an array of objects
        return Array.from(ratingsMap.entries()).map(([rating, total]) => ({
            rating,
            total,
        }));
    },[data])
    const computeWidth = (value: number) => {
        const totalRating = data.reduce((sum, rating) => sum + rating.total, 0)
        return (value/totalRating) * 100
    }

    const userTypeFilters = [
        {
            label: "Driver",
            value: "driver",
        },
        {
            label: "Rider",
            value: "rider",
        },
        { label: "Organization", value: "organization" },
    ];

    const [selected, setSelected] = useState(userTypeFilters.find((item) => item?.value === filters?.user_type))

    const applyFilter = (fn?: () => void) => {
        setFilters({
            user_type: selected?.value,
        });
        fn?.();
    };

    return (
        <div className={cn("flex flex-col gap-4 p-4 rounded-lg bg-white", className)}>
            <div className="flex items-center justify-between">
                <h1 className="text-grey-dark-1 font-semibold text-xl">Ratings</h1>
                <Popover className="relative">
                    <PopoverButton as={TableAction} theme="ghost" block>
                        <Icon icon="mdi:funnel" className="size-4" /> {selected?.label}
                    </PopoverButton>
                    <PopoverBackdrop className="fixed inset-0 bg-black/15 z-10" />
                    <PopoverPanel
                        as="section"
                        transition
                        anchor="bottom end"
                        className="bg-white p-6 rounded origin-top-right flex flex-col gap-5 w-64 transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        {({ close }) => (
                            <Fragment>
                                <h1 className="font-bold text-xl text-grey-dark-1">Filter</h1>
                                <div className="grid gap-5 md:gap-8">
                                    {/* Date Filters */}
                                    <div className="flex flex-col gap-1">
                                        <span className="uppercase text-grey-dark-3 text-xs">User Type</span>
                                        <RadioGroup by={"value" as any} value={selected} onChange={setSelected} className="space-y-2">
                                            {userTypeFilters.map((item) => (
                                                <Radio
                                                    value={item}
                                                    key={item.value}
                                                    className="group relative flex whitespace-nowrap items-center gap-2 cursor-pointer rounded bg-transparent py-2.5 px-2 text-grey-dark-2 transition duration-300 ease-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-3 data-[checked]:font-medium data-[checked]:text-dark-green-1"
                                                >
                                                    <RadioButton name="date" checked={selected?.value === item.value} />
                                                    {item.label}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="w-full max-w-80 ml-auto pt-10 flex items-center justify-end gap-4">
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
            <div className="grid gap-4">
                {
                    ratings.map((rating, id) =>
                    <div key={id} className="flex items-center gap-3">
                        <span className="text-sm text-grey-dark-2">{rating.rating}</span>
                        <div className="flex-1 h-2 rounded-full bg-green-4">
                            <motion.div className="h-2 rounded-full bg-green-1" initial={{ width: "0%" }} whileInView={{ width: `${computeWidth(rating.total)}%` }} transition={{ ease: "linear", duration: 1 }}  />
                        </div>
                        <span className="text-base text-grey-dark-1">{rating.total}</span>
                    </div>
                    )
                }
            </div>
        </div>
    )
}