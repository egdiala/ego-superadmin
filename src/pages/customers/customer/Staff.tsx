import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetRiders } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { SearchInput, Table, TableAction } from "@/components/core";
import { FetchedRider, FetchedRiderCount, FetchedRiders } from "@/types/riders";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

export const CustomerStaffsPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [searchParams, setSearchParams] = useSearchParams();
    const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
    const { data: count, isFetching: fetchingCount, refetch } = useGetRiders({ component, q: value, organization_id: params?.id as string })
    const { data: riders, isLoading } = useGetRiders({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, organization_id: params?.id as string })

    const columns = [
      {
        header: () => "Creation Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRider
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Name",
        accessorKey: "first_name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRider
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.first_name} {item?.last_name}</div>
          )
        }
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
        accessorKey: "ride_data.total",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedRider
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{item?.ride_data?.total || "0"}</div>
          )
        }
      },
      {
        header: () => "Supervisor",
        accessorKey: "org_data.name",
      },
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
      setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
      getPaginationParams(location, setPage, () => {})
    }, [location])
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                <div className="w-full md:w-1/3 xl:w-1/4">
                    <SearchInput placeholder="Search staff" onChange={onChangeHandler} />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction theme="ghost" block disabled={isLoading || fetchingCount} onClick={() => component === "export" ? refetch() : setComponent("export")}>
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                    </div>
                </div>
            </div>
            <Table
              page={page}
              columns={columns}
              perPage={itemsPerPage}
              onPageChange={handlePageChange}
              totalCount={(count as FetchedRiderCount)?.total}
              data={(riders as FetchedRiders)?.user_info ?? []}
              onClick={({ original }) => navigate(`/riders/${original?.auth_id}/profile`)}
              emptyStateText="You have not added any staff yet."
            />
        </motion.div>
    )
}