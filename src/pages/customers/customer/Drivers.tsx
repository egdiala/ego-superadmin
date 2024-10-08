import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { RenderIf, Table } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { useGetVehicles } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import type { FetchedVehicleCount, FetchedVehicleType } from "@/types/vehicles";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const CustomerDriversPage: React.FC = () => {
    const itemsPerPage = 10;
    const params = useParams()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingCount } = useGetVehicles({ component: "count", organization_id: params?.id as string, driver_assigned: "1" })
    const { data: organizationVehicles, isFetching: isFetchingOrganizationVehicles } = useGetVehicles({ organization_id: params?.id as string, driver_assigned: "1" })

    const columns = [
      {
        header: () => "Assignment Date",
        accessorKey: "updatedAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className="flex items-center gap-2.5">
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                <span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.updatedAt, "p")}
              </div>
            </div>
          )
        }
      },
      {
        header: () => "Name",
        accessorKey: "name",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className="flex items-center gap-2.5">
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                <span className="capitalize">{item?.driver_data?.first_name} {item?.driver_data?.last_name}</span>
              </div>
            </div>
          )
        }
      },
      {
        header: () => "Email",
        accessorKey: "driver_data.email",
      },
      {
        header: () => "Phone Number",
        accessorKey: "driver_data.phone_number",
      },
      {
        header: () => "Vehicle Assignment Status",
        accessorKey: "driver_assigned",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className={cn(item?.driver_assigned ? "text-grey-dark-2 bg-green-3" : "text-semantics-error bg-semantics-error/10", "w-fit rounded px-2 py-0.5 font-medium text-sm")}>{item?.driver_assigned ? "Assigned" : "Unassigned"}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className={cn(item?.status === 1 ? "text-green-1" : "text-semantics-error", "font-medium text-sm")}>{item?.status === 1 ? "Active" : "Inactive"}</div>
          )
        }
      }
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
        <Fragment>
            <RenderIf condition={!isFetchingOrganizationVehicles && !fetchingCount}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2 pt-2">
                    <Table
                        page={page}
                        columns={columns}
                        perPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        data={(organizationVehicles as FetchedVehicleType[]) ?? []}
                        totalCount={(count as FetchedVehicleCount)?.total}
                        emptyStateText="You have not added any vehicle yet."
                    />
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetchingOrganizationVehicles || fetchingCount}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}