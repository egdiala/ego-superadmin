import React, { forwardRef } from "react";
import { cn } from "@/libs/cn";
import "./checkbox.css";

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * Name attribute for checkbox
   */
  name: string;
  /**
   * Value of checkbox
   */
  value?: any;
  /**
   * Checked state for checkbox
   */
  checked: boolean;
  /**
   * Disabled state for checkbox
   */
  disabled?: boolean;
  /**
   * Other unknown attributes
   */
  [x: string]: any;
}

/**
 * Checkbox component for user selection
 */
export const Checkbox: React.FC<CheckboxProps> = forwardRef(
  (
    {
      className,
      name,
      value,
      checked = false,
      disabled = false,
      ...props
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        type='checkbox'
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        className={cn("zsm-checkbox", className)}
        {...props}
      />
    );
  }
);