import React from "react";
import { cn } from "@/libs/cn";
import { RenderIf } from "../RenderIf";
import { Icon, type IconifyIcon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import "./moduleListItem.css"

interface ModuleListItemProps {
  /**
   * URL to route to
   */
  to: string;
  /**
   * Name of the page to route to
   */
  name: string;
  /**
   * Icon for route
   */
  icon: string | IconifyIcon;
  /**
   * Number count
   */
  count?: string | number;
}

export const ModuleListItem: React.FC<ModuleListItemProps> = ({ count, icon, name, to }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <div className={cn("ego-module-list-item", isActive ? "ego-module-list-item--active" : "ego-module-list-item--inactive")}>
                    <Icon icon={icon} className="size-5" />
                    <span className="flex-1 line-clamp-1">{name}</span>
                    <RenderIf condition={!!count}>
                        <div className='bg-semantics-error py-0.5 px-1.5 rounded-3xl text-white font-medium text-[0.625rem]/3'>{count}</div>
                    </RenderIf>
                </div>
            )}
        </NavLink>
    )
}