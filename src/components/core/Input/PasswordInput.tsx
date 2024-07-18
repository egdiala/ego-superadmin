import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import "./input.css";

interface PasswordInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Prop to show and hide password
   */
  showPassword?: boolean;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Input component for entering user password
 */
export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const [togglePassword, setTogglePassword] = useState<boolean>(false);
  
    const toggleVisibility = () => {
        setTogglePassword(togglePassword ? false : true);
    };
  
    return (
        <div className='zsm-input--outer'>
            <RenderIf condition={!!props?.label}>
                <label htmlFor={props?.name} className='zsm-input--label'>{props?.label}</label>
            </RenderIf>
            <div className='zsm-input--inner'>
                <input type={props.showPassword && togglePassword ? "text" : "password"} className={["zsm-input pl-2", props.showPassword ? "pr-10" : "pr-2"].join(" ").trim()} {...props} />
                <RenderIf condition={!!props.showPassword}>
                    <button
                        type='button'
                        onClick={toggleVisibility}
                        className={`${props.showPassword ? "toggle-password-icon" : "hidden"}`}
                    >
                        <RenderIf condition={togglePassword}>
                            <Icon icon="solar:eye-closed-bold" className="size-5 right-3 text-grey-dark-1 -mt-[22px] absolute z-10" />
                        </RenderIf>
                        <RenderIf condition={!togglePassword}>
                            <Icon icon="solar:eye-bold" className="size-5 right-3 text-grey-dark-1 -mt-[22px] absolute z-10" />
                        </RenderIf>
                    </button>
                </RenderIf>
            </div>
            <RenderIf condition={!!props?.error}>
                <span className='zsm-input--error'>{props?.error}</span>
            </RenderIf>
        </div>
    );
};