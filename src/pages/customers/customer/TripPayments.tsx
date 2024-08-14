import React from "react";
import { Icon } from "@iconify/react";
import { makeData } from "@/hooks/makeData";
import { SearchInput, Table, TableAction } from "@/components/core";

export const CustomerTripPaymentPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Trip Reference",
        accessorKey: "phone_number",
      },
      {
        header: () => "Payment Ref",
        accessorKey: "first_name",
      },
      {
        header: () => "Payment Method",
        accessorKey: "lastName",
      },
      {
        header: () => "Amount",
        accessorKey: "lastName",
      },
      {
        header: () => "Status",
        accessorKey: "status",
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
                perPage={10}
                page={1}
                getData={getData}
                totalCount={dummyData.length}
                onPageChange={handlePageChange}
                emptyStateText="You have not added any staff yet."
            />
        </div>
    )
}