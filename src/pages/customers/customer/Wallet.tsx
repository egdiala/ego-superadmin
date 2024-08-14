import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { makeData } from "@/hooks/makeData";
import { SearchInput, Table, TableAction } from "@/components/core";

export const CustomerWalletPage: React.FC = () => {
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);

    const columns = [
      {
        header: () => "Date",
        accessorKey: "createdAt",
      },
      {
        header: () => "Transaction type",
        accessorKey: "phone_number",
      },
      {
        header: () => "Description",
        accessorKey: "first_name",
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

    const trips = [
        { label: "Wallet balance", value: "₦235,402,853", color: "bg-[#F8F9FB]" },
        { label: "Inflow", value: "₦502,853", color: "bg-[#F6FBF6]" },
        { label: "Outflow", value: "₦2,853", color: "bg-[#FDF2F2]" },
    ]
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    trips.map((item) =>
                    <div key={item.label} className={cn("relative grid overflow-hidden content-center justify-items-center gap-2 h-24 py-4 rounded-lg", item.color)}>
                      <Icon icon="mdi:naira" className="absolute size-20 -left-6 self-center text-grey-dark-3 text-opacity-10" />
                      <h4 className="text-grey-dark-2 text-sm">{item.label}</h4>
                      <span className="text-grey-dark-1 text-[2rem]/9">{item.value}</span>
                    </div>
                    )
                }
            </div>
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between pt-4">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search description" />
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