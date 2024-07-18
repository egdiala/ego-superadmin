import React, { useId } from "react";
import { RenderIf } from "@/components/core";
import "./textarea.css";

interface TextAreaProps extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Id for input element
   */
  id?: string;

  /**
   * Label for input element
   */
  label?: string;
  /**
   * styles for input element
   */
  containerVariant?: string;
  /**
   * Help text for input element
   */
  help?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Placeholder for textarea
   */
  placeholder?: string;
  /**
   * Maximum length of characters
   */
  maxLength?: number;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Input component for entering user data
 */
export const TextArea: React.FC<TextAreaProps> = (props) => {
  const postTextAreaId = useId();
  return (
    <div className={`${props.containerVariant} zsm-input--outer`}>
       
      <RenderIf condition={!!props?.label}>
        <label htmlFor={postTextAreaId} className='zsm-input--label'>
          {props?.label}
        </label>
      </RenderIf>
      <div className='zsm-input--inner'>
        <textarea
          id={postTextAreaId}
          maxLength={props.maxLength}
          data-testId={props.id}
          rows={5}
          cols={33}
          className='zsm-message-box'
          {...props}
        />
        <RenderIf condition={!!props?.maxLength}>
          <p className="text-xs text-neutral-30 absolute bottom-0 left-[12px] pb-2">
            {(String(props.value)?.length ?? 0)}/{props.maxLength} words
          </p>
        </RenderIf>
      </div>
      <RenderIf condition={!!props?.help}>
        <span className='zsm-input--help'>{props?.help}</span>
      </RenderIf>
      <RenderIf condition={!!props?.error}>
        <span className='zsm-input--error'>{props?.error}</span>
      </RenderIf>
    </div>
  );
};