import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import blankImg from "@/assets/blank.svg";
import { getAdminData } from "@/utils/authUtil";
import { useHasAnyPermission, useHasPermission } from "@/hooks/useHasPermission";
import { ModuleListItem, RenderIf } from "@/components/core";
import { appRoutes, financeRoutes, setupRoutes } from "@/constants/routes";
import "./sidebar.css";
import { cn } from "@/libs/cn";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Icon } from "@iconify/react";

interface SidebarProps {
    showSidebar: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
    const admin = getAdminData()

    const appPermissions = appRoutes.map(route => ({
        route,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hasPermission: useHasPermission(route.name.toUpperCase().replace(/\s+/g, "_"),  "view")
    }));

    const financePermissions = financeRoutes.map(route => ({
        route,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hasPermission: useHasPermission(route.name.toUpperCase().replace(/\s+/g, "_"),  "view")
    }));

    const setupPermissions = setupRoutes.map(route => ({
        route,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hasPermission: useHasPermission(route.name.toUpperCase().replace(/\s+/g, "_"),  "view", route.subRoutes)
    }));

    return (
        <Fragment>
            <nav className={cn("bg-white flex flex-col gap-8 px-5 pt-6 pb-[3.125rem] h-screen max-h-screen w-full max-w-60 lg:fixed inset-y-0 left-0 z-20", showSidebar ? "max-lg:absolute transition transform translate-x-0 ease-out duration-500" : "max-lg:hidden")}>
                
                <img src="/CZ_logo.svg" className="w-48" alt="eGO_green_logo" />
                <div className="pb-4 flex flex-1 flex-col overflow-y-auto scrollbar-hide [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    <RenderIf condition={useHasAnyPermission(appRoutes)}>
                        <div data-slot="section" className="grid gap-1">
                        {
                            appPermissions.map((route) => {
                                const { hasPermission, route: { ...rest } } = route;
                                return (
                                    <RenderIf key={rest?.to} condition={hasPermission}>
                                        <ModuleListItem {...rest} />
                                    </RenderIf>
                                )
                            })
                        }
                        </div>
                    </RenderIf>
                    <RenderIf condition={useHasAnyPermission(financeRoutes)}>
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
                                        financePermissions.map((route) => {
                                            const { hasPermission, route: { ...rest } } = route;
                                            return (
                                                <RenderIf key={rest?.to} condition={hasPermission}>
                                                    <ModuleListItem {...rest} />
                                                </RenderIf>
                                            )
                                        })
                                    }
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </RenderIf>
                    <RenderIf condition={useHasAnyPermission(setupRoutes)}>
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
                                        setupPermissions.map((route) => {
                                            const { hasPermission, route: { ...rest } } = route;
                                            return (
                                                <RenderIf key={rest?.to} condition={hasPermission}>
                                                    <ModuleListItem {...rest} />
                                                </RenderIf>
                                            )
                                        })
                                    }
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </RenderIf>
                </div>
                <Link to="/profile" className="flex items-center gap-2">
                    <img src={admin?.avatar || blankImg} className="size-10 rounded-full object-cover" alt="user" />
                    <div className="flex-1 grid gap-0.5">
                        <h3 className="font-medium text-sm/4 text-grey-dark-1 line-clamp-1 capitalize">{admin?.first_name} {admin?.last_name}</h3>
                        <span className="font-medium text-xs text-grey-dark-3 line-clamp-1 capitalize">{admin?.user_type}</span>
                    </div>
                </Link>
            </nav>
        </Fragment>
    );
};