import React from "react";
import { Table } from "@/components/core/Table";
import { makeData } from "@/hooks/makeData";
import { Icon } from "@iconify/react";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  render: () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
      {
        header: () => "First Name",
        accessorKey: "firstName",
      },
      {
        header: () => "Last Name",
        accessorKey: "lastName",
      },
      {
        header: () => "Age",
        accessorKey: "age",
      },
      {
        header: () => "Visits",
        accessorKey: "visits",
      },
      {
        header: () => "Status",
        accessorKey: "status",
      },
      {
        header: () => "Profile Progress",
        accessorKey: "progress",
      },
      // strictly follow the setup for header, accessorkey and size for all 'Action' columns
      {
        header: () => "Action",
        accessorKey: "action",
        size: 70, // used 70 because I have two action buttons, 50 is ideal for 1 button
        cell: () => (
          <div className="w-fit flex items-center rounded border border-neutral-10 text-xs px-[2px]">
            <button onClick={() => {}} className="py-2 px-2">
              <Icon
                icon="ph:pencil-simple-line"
                className="text-neutral-base"
              />
            </button>
            <div className="h-7 w-[1px] border-r border-r-neutral-10 mx-[2px]"></div>
            <button className="py-2 px-2">
              <Icon icon="ph:user-switch" className="text-neutral-base" />
            </button>
          </div>
        ),
      },
    ];

    const paginateData = (currentPage: number, rowsPerPage: number) => {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const newData = dummyData.slice(startIndex, endIndex);
      setData(newData);
    };

    const handlePageChange = (currentPage: number, rowsPerPage: number) => {
      // in a real page, this function would paginate the data from the backend
      paginateData(currentPage, rowsPerPage);
    };

    const getData = (currentPage: number, rowsPerPage: number) => {
      // in a real page, this function would paginate the data from the backend
      paginateData(currentPage, rowsPerPage);
    };

    return (
      <Table
        columns={columns}
        data={data}
        getData={getData}
        totalCount={dummyData.length}
        onPageChange={handlePageChange}
      />
    );
  },
  args: {
    columns: [],
    data: [],
    totalCount: 0,
    getData: () => {},
    onPageChange: () => {},
  },
};