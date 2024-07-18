import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@/components/core/Pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: function Component(args) {
    const [page, setPage] = React.useState(args.currentPage);

    const handlePrev = () => {
      setPage((prev: number) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
      setPage((prev: number) => (prev < args.totalPages ? prev + 1 : prev));
    };

    const handleGoToPage = (pageNumber: string | number) => {
      setPage(pageNumber as number);
    };

    return (
        <div className="w-[50dvw] flex justify-center">
            <Pagination
                currentPage={page}
                totalPages={args.totalPages}
                prev={handlePrev}
                next={handleNext}
                goToPage={handleGoToPage}
            />
        </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    prev: () => { },
    next: () => { },
    goToPage(v) {
        alert(v)
    },
  },
};