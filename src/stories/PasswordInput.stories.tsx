import { ChangeEvent } from "react";
import { fn } from "@storybook/test";
import { PasswordInput } from "@/components/core";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "Forms/Password Input",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: { control: "text" },
    label: { control: "text" },
    showPassword: { control: "boolean" }
  },
  args: { onChange: fn() },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><PasswordInput {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    name: "password",
    label: "Password",
    placeholder: "●●●●●●●●",
    showPassword: true,
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><PasswordInput {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    name: "password",
    placeholder: "●●●●●●●●",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><PasswordInput {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    name: "password",
    label: "Password",
    value: "Password1",
    error: "Password is not valid",
    placeholder: "●●●●●●●●",
  },
};