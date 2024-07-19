import type { Meta, StoryObj } from "@storybook/react";
import { ModuleListItem } from "@/components/core";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "UI/ModuleListItem",
  component: ModuleListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ModuleListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ActiveLink: Story = {
  render: (args) => <ModuleListItem {...args} />,
  args: {
    to: "/?path=/docs/ui-modulelistitem--docs",
    name: "Notifications",
    icon: "ph:bell-simple",
  },
};

export const InactiveLink: Story = {
  render: (args) => <ModuleListItem {...args} />,
  args: {
    to: "/?path=/docs/ui-button--docs",
    name: "Button",
    icon: "ph:gear",
  },
};

export const WithCount: Story = {
  render: (args) => <ModuleListItem {...args} />,
  args: {
    to: "",
    name: "Notifications",
    icon: "ph:bell-simple",
    count: 86,
  },
};