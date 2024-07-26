import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@/components/core";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
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
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Sample: Story = {
  render: (args) => <Breadcrumb {...args} />,
  args: {
    items: [
      {
        label: "Home",
        link: "/",
      },
      {
        label: "Management",
        link: "/management",
      },
      {
        label: "Staff",
        link: "/management/staff",
      },
    ],
  },
};