import React, { Fragment, useState } from "react"
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { format, formatRelative } from "date-fns";
import { FetchedDriverType } from "@/types/drivers";
import { Loader } from "@/components/core/Button/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { useGetDrivers, useGetVehicle } from "@/services/hooks/queries";
import { Breadcrumb, Button, RadioButton, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { useAssignVehicle } from "@/services/hooks/mutations";

export const VehicleAssignPage: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { mutate, isPending } = useAssignVehicle(() => navigate(`/vehicles/${params?.id as string}/profile`))
    const { data: drivers, isFetching: isFetchingDrivers } = useGetDrivers({ assign_status: 0, suspension_status: "0", status: 1 })
    const [driverToAssign, setDriverToAssign] = useState<FetchedDriverType | null>(null)
    const { data: vehicle, isFetching: isFetchingVehicle } = useGetVehicle(params?.id as string)

    const assignVehicle = () => {
        mutate({ auth_id: driverToAssign?.driver_id as string, vehicle_id: vehicle?.vehicle_id as string, user_type: "driver" })
    }

    const columns = [
        {
            header: () => "Reg. Date",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                    <div className="flex items-center gap-2.5 text-sm text-grey-dark-2 lowercase whitespace-nowrap">
                        <RadioButton
                            name="driver"
                            value={item?.driver_id}
                            disabled={isPending}
                            checked={driverToAssign?.driver_id === item?.driver_id}
                            onChange={() => {
                                setDriverToAssign(item)
                                row.toggleSelected()
                            }}
                        />
                        <span className="capitalize">{formatRelative(item?.createdAt, new Date()).split("at")[0]}</span> • {format(item?.createdAt, "p")}
                    </div>
                )
            }
        },
        {
            header: () => "Name",
            accessorKey: "fullName",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
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
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                <div className="text-sm text-grey-dark-2 capitalize">{item?.phone_number || "-"}</div>
                )
            }
        },
        {
            header: () => "Vehicle Assignment Status",
            accessorKey: "vehicleStatus",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                <div className={cn(item?.vehicle_id ? "bg-green-3" : "bg-yellow-3", "flex w-fit rounded items-center text-grey-dark-2 px-2 py-0.5 text-sm")}>{item?.vehicle_id ? "Assigned" : "Unassigned"}</div>
                )
            }
        },
        {
            header: () => "Status",
            accessorKey: "status",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedDriverType
                return (
                <div className={cn(item?.status === 1 ? "text-dark-green-1" : "text-grey-dark-1", "font-medium text-sm")}>{item?.status === 1 ? "Active" : "Suspended"}</div>
                )
            }
        }
    ];

    const handlePageChange = () => {
        // in a real page, this function would paginate the data from the backend

    };

    const getData = () => {
        // in a real page, this function would paginate the data from the backend

    };
    return (
        <Fragment>
            <RenderIf condition={!isFetchingVehicle}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[
                        { label: "Vehicles", link: "/vehicles" },
                        { label: `${vehicle?.plate_number}`, link: `/vehicles/${params?.id as string}/profile` },
                        { label: "Assign Driver", link: `/vehicles/${params?.id as string}/assign` },
                    ]} showBack />
                    <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                            <div className="w-full md:w-1/3 xl:w-1/4">
                                <SearchInput placeholder="Search name, ref etc" />
                            </div>
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <TableAction theme="ghost" block>
                                    <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                                    Export
                                </TableAction>
                                <TableAction theme="grey" block>
                                    <Icon icon="mdi:funnel" className="size-4" />
                                    Filter
                                </TableAction>
                            </div>
                        </div>
                        <RenderIf condition={!isFetchingDrivers}>
                            <Table
                                columns={columns}
                                data={drivers as FetchedDriverType[] ?? []}
                                getData={getData}
                                totalCount={(drivers as FetchedDriverType[])?.length}
                                onPageChange={handlePageChange}
                                config={{ enableRowSelection: true, enableMultiRowSelection: false }}
                            />
                        </RenderIf>
                        <div className="flex items-center w-full justify-end gap-4 pt-6 md:pt-12">
                            <Button theme="tertiary" onClick={() => navigate(`/vehicles/${params?.id as string}/profile`)}>Cancel</Button>
                            <Button theme="primary" onClick={assignVehicle} loading={isPending} disabled={!driverToAssign?.driver_id || isPending}>Assign Driver</Button>
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetchingVehicle}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}