import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import blankImg from "@/assets/blank.svg";
import { getAdminData } from "@/utils/authUtil";
import { useHasAnyPermission, useHasPermission } from "@/hooks/useHasPermission";
import { ModuleListItem, RenderIf } from "@/components/core";
import { appRoutes, financeRoutes, setupRoutes } from "@/constants/routes";
import "./sidebar.css";
import { cn } from "@/libs/cn";

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
                
                <img src="/eGO_logo_green.svg" className="w-32" alt="eGO_green_logo" />
                <div className="pb-4 flex flex-1 flex-col overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
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
                        <div data-slot="section" className="grid gap-1">
                            <div className="text-dark-green-1 pl-3 font-medium uppercase text-[0.625rem]/3">Finance</div>
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
                    </RenderIf>
                    <RenderIf condition={useHasAnyPermission(setupRoutes)}>
                        <div data-slot="section" className="grid gap-1">
                            <div className="text-dark-green-1 pl-3 font-medium uppercase text-[0.625rem]/3">Setup</div>
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