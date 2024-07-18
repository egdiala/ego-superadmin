import type { Meta, StoryObj } from "@storybook/react";
import { RenderIf } from "@/components/core";

const meta = {
  title: "Renderless/RenderIf",
  component: RenderIf,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    condition: { control: "boolean" },
  },
} satisfies Meta<typeof RenderIf>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: (args) => <RenderIf {...args}></RenderIf>,
  args: {
    condition: true,
    children: (
      <div className="text-grey-dark-3">
        Show me if condition is <strong className="text-grey-dark-1">true</strong>
      </div>
    ),
  },
};