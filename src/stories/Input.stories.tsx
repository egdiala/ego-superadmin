import { ChangeEvent } from "react";
import { fn } from "@storybook/test";
import { Input } from "./../components/core/Input";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><Input {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "first_name",
    label: "First Name",
    placeholder: "Enter your first name",
    help: "First name only"
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><Input {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "first_name",
    placeholder: "Enter your first name",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><Input {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "email",
    name: "email",
    label: "Email Address",
    value: "egwuchukwu.diala@zeno.",
    error: "Please enter a valid email",
    placeholder: "Enter your email address",
  },
};

export const ErrorWithoutLabel: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><Input {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "email",
    name: "email",
    value: "egdiala@zeno.",
    error: "Please enter a valid email",
    placeholder: "Enter your email address",
  },
};

export const WithLeftIcon: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><Input {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "first_name",
    label: "Spotify Username",
    iconLeft: "logos:spotify-icon",
    placeholder: "@egdiala",
  },
};

export const WithRightIcon: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><Input {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "first_name",
    label: "First Name",
    iconRight: "logos:amplication-icon",
    placeholder: "Enter your first name",
  },
};