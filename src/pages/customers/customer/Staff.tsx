import React from "react";
import { Icon } from "@iconify/react";
import { makeData } from "@/hooks/makeData";
import { SearchInput, Table, TableAction } from "@/components/core";

export const CustomerStaffsPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
      {
        header: () => "Creation Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Name",
        accessorKey: "fullName",
      },
      {
        header: () => "Email",
        accessorKey: "email",
      },
      {
        header: () => "Phone Number",
        accessorKey: "phone_number",
      },
      {
        header: () => "Trips taken",
        accessorKey: "lastName",
      },
      {
        header: () => "Supervisor",
        accessorKey: "lastName",
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
        <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search reference" />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction theme="ghost" block>
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                        <TableAction theme="secondary" block>
                            <Icon icon="mdi:funnel" className="size-4" />
                            Filter
                        </TableAction>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                data={data}
                getData={getData}
                perPage={10}
                page={1}
                totalCount={dummyData.length}
                onPageChange={handlePageChange}
                emptyStateText="You have not added any staff yet."
            />
        </div>
    )
}