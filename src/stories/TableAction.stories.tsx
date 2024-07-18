import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TableAction } from "./../components/core/TableActions";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Table Action",
  component: TableAction,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    block: { control: "boolean" },
    loading: { control: "boolean" },
    theme: { control: "radio" }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof TableAction>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><TableAction {...args}>Primary 🤯</TableAction></div>,
  args: {
    theme: "primary",
  },
};

export const Secondary: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><TableAction {...args}>Secondary 🤨</TableAction></div>,
  args: {
    theme: "secondary",
  },
};

export const Tertiary: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><TableAction {...args}>Tertiary 🏫</TableAction></div>,
  args: {
    theme: "tertiary",
  },
};

export const Grey: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><TableAction {...args}>Grey 🌚</TableAction></div>,
  args: {
    theme: "grey",
  },
};

export const Ghost: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><TableAction {...args}>Ghost 👻</TableAction></div>,
  args: {
    theme: "ghost",
  },
};
