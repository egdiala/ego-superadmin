import React from "react";
import { OtpInput } from "@/components/core";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Forms/Otp Input",
  component: OtpInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Partial<Story> = {
  render: (args) => {
    const [otp, setOtp] = React.useState(args.value);
    const onChange = (value: any) => setOtp(value);
    return <OtpInput value={otp} label={args.label} onChange={onChange} />;
  },
  args: {
    value: "",
  },
};

export const WithError: Partial<Story> = {
  render: (args) => {
    const [otp, setOtp] = React.useState(args.value);
    const onChange = (value: any) => setOtp(value);
    return (
      <OtpInput
        value={otp}
        label={args.label}
        error={!otp && args.error}
        onChange={onChange}
      />
    );
  },
  args: {
    value: "",
    error: "Code is required",
  },
};