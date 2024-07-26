import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@/components/core/Toggle";
import React from "react";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Sample: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);
    const onChange = (value: any) => setChecked(value);
    return <Toggle checked={checked} onChange={onChange} />;
  },
  args: {
    checked: true,
  },
};