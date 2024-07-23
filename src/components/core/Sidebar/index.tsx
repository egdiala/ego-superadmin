import React from "react";
import { getAdminData } from "@/utils/authUtil";
import { ModuleListItem } from "../ModuleListItem";
import { adminRoutes, appRoutes, financeRoutes } from "@/constants/routes";
import "./sidebar.css";

export const Sidebar: React.FC = () => {
    const admin = getAdminData()
    return (
        <nav className="bg-white flex flex-col transition-all ease-out duration-500 gap-8 px-5 pt-6 pb-[3.125rem] h-screen w-full max-w-60 fixed inset-y-0 left-0 max-lg:hidden">
            <img src="/eGO_logo_green.svg" className="w-32" alt="eGO_green_logo" />
            <div className="pb-4 flex flex-1 flex-col overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                <div data-slot="section" className="grid gap-1">
                {
                    appRoutes.map((item) =>
                        <ModuleListItem key={item.to} {...item} />
                    )
                }
                </div>
                <div data-slot="section" className="grid gap-1">
                <div className="text-dark-green-1 pl-3 font-medium uppercase text-[0.625rem]/3">Finance</div>
                {
                    financeRoutes.map((item) =>
                        <ModuleListItem key={item.to} {...item} />
                    )
                }
                </div>
                <div data-slot="section" className="grid gap-1">
                <div className="text-dark-green-1 pl-3 font-medium uppercase text-[0.625rem]/3">Admin Accounts</div>
                {
                    adminRoutes.map((item) =>
                        <ModuleListItem key={item.to} {...item} />
                    )
                }
                </div>
            </div>
            <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-10 rounded-full object-cover" alt="user" />
                <div className="flex-1 grid gap-0.5">
                    <h3 className="font-medium text-sm/4 text-grey-dark-1 line-clamp-1 capitalize">{admin?.first_name} {admin?.last_name}</h3>
                    <span className="font-medium text-xs text-grey-dark-3 line-clamp-1 capitalize">{admin?.user_type}</span>
                </div>
            </div>
        </nav>
    );
};