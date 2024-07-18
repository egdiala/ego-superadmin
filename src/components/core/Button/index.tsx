import React, { type ReactNode } from "react";
import { cn } from "@/libs/cn";
import { Loader } from "./Loader";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import "./button.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Shows a loading state on Button component
   */
  loading?: boolean;
  /**
   * Should the button fill it's parent container?
   */
  block?: boolean;
  /**
   * What variant to render
   */
  theme?: "primary" | "secondary" | "tertiary" | "outline" | "white" | "ghost" | "arrow-cta-1" | "arrow-cta-2";
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
 * Button component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  block,
  theme,
  children,
  ...props
}) => {
  const btn = {
    themes: {
      primary: "zsm-button--primary",
      secondary: "zsm-button--secondary",
      tertiary: "zsm-button--tertiary",
      outline: "zsm-button--outline",
      white: "zsm-button--white",
      ghost: "zsm-button--ghost",
      "arrow-cta-1": "zsm-button--arrow-cta-1",
      "arrow-cta-2": "zsm-button--arrow-cta-2"
    },
  };

  const width = block && "zsm-button--block";
  
  return (
    <button className={cn("w-fit", "zsm-button", btn.themes[theme as keyof typeof btn.themes], width, className)} {...props}>
        <RenderIf condition={loading!}>
            <div className="flex items-center justify-center">
                <Loader className="spinner" />
            </div>
        </RenderIf>
        <RenderIf condition={!loading}>
            {children}
            <RenderIf condition={theme?.startsWith("arrow-cta-")!}>
              <Icon icon="radix-icons:arrow-top-right" className="size-6 text-green-0" />
            </RenderIf>
        </RenderIf>
    </button>
  );
};