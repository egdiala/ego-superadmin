import React, { type ReactNode } from "react";
import { cn } from "@/libs/cn";
import "./tableAction.css"
import "./../Button/button.css";

interface TableActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Should the button fill it's parent container?
   */
  block?: boolean;
  /**
   * What variant to render
   */
  theme?: "primary" | "secondary" | "tertiary" | "grey" | "ghost";
  /**
   * Renders child nodes passed into Button component
   */
  children?: string | ReactNode;
  /**
   * Other unknown attributes
   */
  [x: string]: any;
}

/**
 * Table Action component for user interaction
 */
export const TableAction: React.FC<TableActionProps> = ({
  className,
  block,
  theme,
  children,
  ...props
}) => {
  const btn = {
    themes: {
      primary: "zsm-table-action--primary",
      secondary: "zsm-table-action--secondary",
      tertiary: "zsm-table-action--tertiary",
      grey: "zsm-table-action--grey",
      ghost: "zsm-table-action--ghost",
    },
  };

  const width = block && "zsm-button--block";
  
  return (
    <button className={cn("w-fit", "zsm-button", btn.themes[theme as keyof typeof btn.themes], width, className)} {...props}>
{       children}
    </button>
  );
};