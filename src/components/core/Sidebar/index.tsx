import React from "react";
import { Link } from "react-router-dom";
import blankImg from "@/assets/blank.svg";
import { getAdminData } from "@/utils/authUtil";
import { ModuleListItem } from "../ModuleListItem";
import { appRoutes, financeRoutes, setupRoutes } from "@/constants/routes";
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
                <div className="text-dark-green-1 pl-3 font-medium uppercase text-[0.625rem]/3">Setup</div>
                {
                    setupRoutes.map((item) =>
                        <ModuleListItem key={item.to} {...item} />
                    )
                }
                </div>
            </div>
            <Link to="/profile" className="flex items-center gap-2">
                <img src={admin?.avatar || blankImg} className="size-10 rounded-full object-cover" alt="user" />
                <div className="flex-1 grid gap-0.5">
                    <h3 className="font-medium text-sm/4 text-grey-dark-1 line-clamp-1 capitalize">{admin?.first_name} {admin?.last_name}</h3>
                    <span className="font-medium text-xs text-grey-dark-3 line-clamp-1 capitalize">{admin?.user_type}</span>
                </div>
            </Link>
        </nav>
    );
};