import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./../components/core/Button/index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Button",
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><Button {...args}>Primary 🤯</Button></div>,
  args: {
    theme: "primary",
  },
};

export const Secondary: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><Button {...args}>Secondary 🤨</Button></div>,
  args: {
    theme: "secondary",
  },
};

export const Tertiary: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><Button {...args}>Tertiary 🏫</Button></div>,
  args: {
    theme: "tertiary",
  },
};

export const Grey: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><Button {...args}>Grey 🌚</Button></div>,
  args: {
    theme: "grey",
  },
};

export const Ghost: Story = {
  render: (args) => <div className="w-[50dvw] flex justify-center"><Button {...args}>Ghost 👻</Button></div>,
  args: {
    theme: "ghost",
  },
};
