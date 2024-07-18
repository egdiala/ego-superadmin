import { ChangeEvent } from "react";
import { fn } from "@storybook/test";
import { PasswordInput } from "@/components/core";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

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
    const [, setArgs] = useArgs();
    const onValueChange = (value: ChangeEvent<HTMLInputElement>) => {
      args.onChange?.(value);
      setArgs({ value });
    };
    return <div className="w-[50dvw] flex justify-center"><PasswordInput {...args} onChange={() => onValueChange} /></div>;
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
    const [, setArgs] = useArgs();
    const onValueChange = (value: ChangeEvent<HTMLInputElement>) => {
      args.onChange?.(value);
      setArgs({ value });
    };
    return <div className="w-[50dvw] flex justify-center"><PasswordInput {...args} onChange={() => onValueChange} /></div>;
  },
  args: {
    name: "password",
    placeholder: "●●●●●●●●",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [, setArgs] = useArgs();
    const onValueChange = (value: ChangeEvent<HTMLInputElement>) => {
      args.onChange?.(value);
      setArgs({ value });
    };
    return <div className="w-[50dvw] flex justify-center"><PasswordInput {...args} onChange={() => onValueChange} /></div>;
  },
  args: {
    name: "password",
    label: "Password",
    value: "Password1",
    error: "Password is not valid",
    placeholder: "●●●●●●●●",
  },
};