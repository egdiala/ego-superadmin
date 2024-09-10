import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FetchedVehicleType } from "@/types/vehicles";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useRevokeVehicle } from "@/services/hooks/mutations";
import { useGetOrganization, useGetVehicles } from "@/services/hooks/queries";
import { assignVehicleToOrganisationSchema } from "@/validations/organizations";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Button, Checkbox, RenderIf, SearchInput, Table } from "@/components/core";

export const RevokeOrganizationVehiclesPage: React.FC = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const { mutate, isPending } = useRevokeVehicle(() => navigate("/customers"))
    const { data: customer, isFetching: isFetchingCustomer } = useGetOrganization(params?.id as string)
    const { data: vehicles, isFetching: isFetchingVehicles } = useGetVehicles({ organization_id: params?.id as string })

    const { handleSubmit: submitCreateCustomer, isValid: isAssignVehiclesValid, setFieldValue, values } = useFormikWrapper({
      initialValues: {
        auth_id: params?.id as string,
        vehicle_id: [] as string[],
        user_type: "organization" as "organization",
      },
      enableReinitialize: true,
      validationSchema: assignVehicleToOrganisationSchema,
      onSubmit: () => {
        const { vehicle_id, ...rest } = values;
        mutate({ vehicle_id: vehicle_id?.join(", "), ...rest })
      },
    })

    const columns = [
      {
        header: () => "Reg. Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          const isAssigned = values.vehicle_id?.includes(item?.vehicle_id)
          return (
            <div className="flex items-center gap-2.5">
              <Checkbox
                name="vehicle"
                value={item?.vehicle_id}
                disabled={isPending}
                checked={isAssigned}
                onChange={() => {
                  !isAssigned ? setFieldValue("vehicle_id", [...values.vehicle_id, item?.vehicle_id]) : setFieldValue("vehicle_id", values.vehicle_id.filter((id) => id !== item?.vehicle_id))
                  row.toggleSelected()
                }}
              />
              <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                <span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}
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
            <div className="flex items-center gap-1 text-dark-green-1"><Icon icon="material-symbols-light:bolt" className="text-green-1" />0%</div>
          )
        }
      },
      {
        header: () => "Driver Assign. Status",
        accessorKey: "driver_assigned",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className={cn(item?.driver_assigned ? "text-grey-dark-2 bg-green-3" : "text-grey-dark-1 bg-yellow-1", "w-fit rounded px-2 py-0.5 font-medium text-sm")}>{item?.driver_assigned ? "Assigned" : "Unassigned"}</div>
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
    }, [location, setPage])
  
    return (
        <Fragment>
            <RenderIf condition={!isFetchingVehicles && !isFetchingCustomer}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "All Customers", link: "/customers" }, { label: customer?.name as string, link: `/customers/${params?.id}/dashboard` }, { label: "Revoke Vehicle", link: `/customers/${params?.id}/revoke` }]} showBack />
                    <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                        <h1 className="font-bold text-xl text-grey-dark-1">Select Vehicles</h1>
                        <motion.form onSubmit={submitCreateCustomer} variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col md:flex-row gap-4 md:items-center md:w-1/3 xl:w-2/4">
                                    <div className="flex-1">
                                        <SearchInput placeholder="Search name, ref etc" />
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-grey-dark-2 px-2 py-2.5 rounded bg-green-4">
                                        Vehicles Selected: &nbsp;<span className="font-semibold text-green-1">{values?.vehicle_id?.length}</span>
                                    </div>
                                </div>
                                <Button type="submit" theme="primary" disabled={!isAssignVehiclesValid}>Revoke Vehicles</Button>
                            </div>
                            <RenderIf condition={!isFetchingVehicles}>
                                <Table
                                    page={page}
                                    columns={columns}
                                    perPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                    data={(vehicles as FetchedVehicleType[]) ?? []}
                                    emptyStateText="You have not added any vehicle yet."
                                    totalCount={(vehicles as FetchedVehicleType[])?.length}
                                />
                            </RenderIf>
                            <RenderIf condition={isFetchingVehicles}>
                            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                            </RenderIf>
                        </motion.form>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetchingVehicles || isFetchingCustomer}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}