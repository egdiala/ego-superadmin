import React, { Fragment, useMemo } from "react";
import "./sidebar.css";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import blankImg from "@/assets/blank.svg";
import { getAdminData } from "@/utils/authUtil";
import { ModuleListItem } from "@/components/core";
import type { FetchedNotificationsCount } from "@/types/notifications";
import { appRoutes, financeRoutes, setupRoutes } from "@/constants/routes";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useGetAdminProfile, useGetNotifications } from "@/services/hooks/queries";

interface SidebarProps {
    showSidebar: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
    const admin = getAdminData()
    const { data } = useGetAdminProfile()
    const { data: notificationsCount } = useGetNotifications<FetchedNotificationsCount>({ component: "count" })

    const newAppRoutes = useMemo(() => {
        return appRoutes.map((item) => item.name === "Notifications" ? ({ to: item.to, name: item.name, icon: item.icon, count: notificationsCount?.pending }) : item)
    },[notificationsCount])

    return (
        <Fragment>
            <nav className={cn("bg-white flex flex-col gap-8 px-5 pt-6 pb-[3.125rem] h-screen max-h-screen w-full max-w-60 lg:fixed inset-y-0 left-0 z-20", showSidebar ? "max-lg:absolute transition transform translate-x-0 ease-out duration-500" : "max-lg:hidden")}>
                
                <img src="/CZ_logo.svg" className="w-48" alt="eGO_green_logo" />
                <div className="pb-4 flex flex-1 flex-col overflow-y-auto scrollbar-hide [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    <div data-slot="section" className="grid gap-1">
                        {
                            newAppRoutes.map((route) => {
                                return (
                                    <ModuleListItem key={route.to} {...route} />
                                )
                            })
                        }
                    </div>
                    <Disclosure>
                        <DisclosureButton className="flex items-center py-2.5 px-3 group">
                            <div className="flex flex-1 items-center gap-2">
                                <Icon icon="lucide:badge-dollar-sign" className="text-grey-dark-2 hover:text-grey-dark-1 group-data-[open]:text-grey-dark-1 size-4" />
                                <span className="font-medium text-sm text-grey-dark-2 hover:text-grey-dark-1 group-data-[open]:text-grey-dark-1">Finance</span>
                            </div>
                            <Icon icon="lucide:chevron-right" className="size-4 transition transform ease-out duration-500 group-data-[open]:-rotate-90 text-grey-dark-3 hover:text-dark-green-1 group-data-[open]:text-dark-green-1" />
                        </DisclosureButton>
                        <DisclosurePanel transition className="origin-top transition duration-500 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-gray-500">
                            <div data-slot="section" className="grid gap-1 pt-1">
                                {
                                    financeRoutes.map((route) => {
                                        return (
                                            <ModuleListItem key={route.to} {...route} />
                                        )
                                    })
                                }
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure>
                        <DisclosureButton className="flex items-center py-2.5 px-3 group">
                            <div className="flex flex-1 items-center gap-2">
                                <Icon icon="lucide:bolt" className="text-grey-dark-2 hover:text-grey-dark-1 group-data-[open]:text-grey-dark-1 size-4" />
                                <span className="font-medium text-sm text-grey-dark-2 hover:text-grey-dark-1 group-data-[open]:text-grey-dark-1">Setup</span>
                            </div>
                            <Icon icon="lucide:chevron-right" className="size-4 transition transform ease-out duration-500 group-data-[open]:-rotate-90 text-grey-dark-3 hover:text-dark-green-1 group-data-[open]:text-dark-green-1" />
                        </DisclosureButton>
                        <DisclosurePanel transition className="origin-top transition duration-500 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-gray-500">
                            <div data-slot="section" className="grid gap-1 pt-1">
                                {
                                    setupRoutes.map((route) => {
                                        return (
                                            <ModuleListItem key={route.to} {...route} />
                                        )
                                    })
                                }
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                </div>
                <Link to="/profile" className="flex items-center gap-2">
                    <img src={(data?.avatar) || blankImg} className="size-10 rounded-full object-cover" alt="user" />
                    <div className="flex-1 grid gap-0.5">
                        <h3 className="font-medium text-sm/4 text-grey-dark-1 line-clamp-1 capitalize">{admin?.first_name.toLowerCase()} {admin?.last_name.toLowerCase()}</h3>
                        <span className="font-medium text-xs text-grey-dark-3 line-clamp-1 capitalize">{admin?.user_type}</span>
                    </div>
                </Link>
            </nav>
        </Fragment>
    );
};