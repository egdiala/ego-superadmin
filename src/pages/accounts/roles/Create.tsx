import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { Breadcrumb, Button, Checkbox, Input } from "@/components/core";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

export const CreateRolePage: React.FC = () => {
    const navigate = useNavigate()
    const permissions = [
        {
            label: "Create",
            class: "grid-rows-none grid-cols-2 lg:grid-cols-none lg:grid-rows-3",
            items: ["Vehicle", "Partners", "Drivers", "Maintenance & repairs", "Personnel", "Promo Code", "Ticket", "Emergency Emails", "Emergency", "Emergency Numbers", "Partners"]
        },
        {
            label: "Read",
            class: "grid-rows-none grid-cols-2 lg:grid-cols-none lg:grid-rows-6",
            items: [
                "Dashboard", "Users", "Riders", "Personnels", "Drivers", "Vehicles",
                "Trip Manifest", "FDTs and Schedules", "Emergency", "Ticket", "Partners", "Support",
                "Ratings and review", "Activity Log", "Referral", "Trip Payments", "Service payments", "Ticket",
                "Maintenance & repairs", "Promo", "Maps", "Setup", "Notifications"
            ]
        },
        {
            label: "Update",
            class: "grid-rows-none grid-cols-2 lg:grid-cols-none lg:grid-rows-2",
            items: ["Driver Status", "Vehicles", "Emergency Status", "Maintenance & repairs", "Ticket Status", "Promo Codes"]
        },
        {
            label: "Delete",
            class: "grid-rows-none grid-cols-2 lg:grid-cols-none lg:grid-rows-1",
            items: ["User", "Emergency Number", "Emergency Email", "Promo Code"]
        },
    ]
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2">
            <Breadcrumb items={[{ label: "Roles", link: "/accounts/roles" }, { label: "Add new role", link: "/accounts/roles/create" }]} showBack />
            <div className="flex flex-col gap-4 bg-white p-4 rounded-lg">
                <h1 className="font-semibold text-xl">Add New Role</h1>
                    <div className="grid gap-6 pb-14">
                        <Input label="Role Name" type="text" />
                        {
                            permissions.slice(0,3).map((permission) =>
                            <Disclosure as="div" className="border border-[#E1F4F4] rounded" defaultOpen={true}>
                                <div className="group bg-grey-dark-4 pl-4 pr-3 py-2.5 flex w-full items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <span className="text-base font-medium text-grey-dark-1 inline-flex">{permission.label}&nbsp;<span className="hidden md:block"> Permissions</span></span>
                                        <div className="text-sm px-2 py-0.5 bg-green-3 text-grey-dark-1 rounded-full">0 Selected</div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className="flex items-center gap-2">
                                            <Checkbox name="selectAll" checked={false} />
                                            <span className="text-sm text-grey-dark-1">Select all</span>
                                        </div>
                                        <DisclosureButton className="group">
                                            <Icon icon="ph:caret-down" className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 transform transition-transform duration-300" />
                                        </DisclosureButton>
                                    </div>
                                </div>
                                <DisclosurePanel transition className={cn("grid lg:grid-flow-col gap-y-4 pt-4 px-4 pb-8 origin-top transition duration-300 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0", permission.class)}>
                                    {
                                        permission.items.map((item) =>
                                            <div className="flex items-center gap-2 p-2">
                                                <Checkbox name={item} checked={false} />
                                                <span>{item}</span>
                                            </div>
                                        )
                                    }
                                </DisclosurePanel>
                            </Disclosure>
                            )
                        }
                        <Disclosure as="div" className="border border-[#E1F4F4] rounded" defaultOpen={true}>
                            <div className="group bg-[#FFE9E9] pl-4 pr-3 py-2.5 flex w-full items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <span className="text-base font-medium text-grey-dark-1 inline-flex">{permissions[3].label}&nbsp;<span className="hidden md:block"> Permissions</span></span>
                                    <div className="text-sm px-2 py-0.5 bg-semantics-error text-white rounded-full">0 Selected</div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="flex items-center gap-2">
                                        <Checkbox name="selectAll" checked={false} />
                                        <span className="text-sm text-grey-dark-1">Select all</span>
                                    </div>
                                    <DisclosureButton className="group">
                                        <Icon icon="ph:caret-down" className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 transform transition-transform duration-300" />
                                    </DisclosureButton>
                                </div>
                            </div>
                            <DisclosurePanel transition className={cn("grid lg:grid-flow-col gap-y-4 pt-4 px-4 pb-8 origin-top transition duration-300 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0", permissions[3].class)}>
                                {
                                    permissions[3].items.map((item) =>
                                        <div className="flex items-center gap-2 p-2">
                                            <Checkbox name={item} checked={false} />
                                            <span>{item}</span>
                                        </div>
                                    )
                                }
                            </DisclosurePanel>
                        </Disclosure>
                    </div>
                <div className="flex items-center gap-4 justify-end">
                    <Button theme="secondary" onClick={() => navigate("/accounts/roles")}>Cancel</Button>
                    <Button theme="primary">Add Role</Button>
                </div>
            </div>
        </motion.div>
    )
}