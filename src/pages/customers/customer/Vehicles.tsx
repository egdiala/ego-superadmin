import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import { RenderIf, Table } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { useGetVehicles } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import type { FetchedVehicleCount, FetchedVehicleType } from "@/types/vehicles";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const CustomerVehiclesPage: React.FC = () => {
    const itemsPerPage = 10;
    const params = useParams()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: count, isFetching: fetchingCount } = useGetVehicles({ component: "count", organization_id: params?.id as string })
    const { data: organizationVehicles, isFetching: isFetchingOrganizationVehicles } = useGetVehicles({ organization_id: params?.id as string, page: page.toString(), item_per_page: itemsPerPage.toString() })

    const columns = [
      {
        header: () => "Assignment Date",
        accessorKey: "updatedAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className="flex items-center gap-2.5">
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                <span className="capitalize">{formatRelative(item?.updatedAt, new Date()).split("at")[0]}</span> • {format(item?.updatedAt, "p")}
              </div>
            </div>
          )
        }
      },
      {
        header: () => "Plate Number",
        accessorKey: "plate_number",
      },
      {
        header: () => "Serial Number",
        accessorKey: "car_number",
      },
      {
        header: () => "Mileage",
        accessorKey: "mileage",
      },
      {
        header: () => "Battery Status",
        accessorKey: "online", //will be changed when the accurate response is added in data returned
        cell: () => {
          return (
            <div className="flex items-center gap-1 text-dark-green-1"><Icon icon="material-symbols-light:bolt" className="text-green-1" />100%</div>
          )
        }
      },
      {
        header: () => "Driver Assign. Status",
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