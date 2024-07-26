import { ChangeEvent } from "react";
import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SearchInput } from "./../components/core/Input";

const meta = {
  title: "Forms/Search Input",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><SearchInput {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "search",
    placeholder: "Type to search...",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><SearchInput {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "search",
    error: "Search cannot be empty",
    placeholder: "Type to search...",
  },
};

export const WithRightIcon: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    };
    return <div className="w-[50dvw] flex justify-center"><SearchInput {...args} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e)} /></div>;
  },
  args: {
    type: "text",
    name: "search",
    iconRight: "logos:amplication-icon",
    placeholder: "Type to search...",
  },
};