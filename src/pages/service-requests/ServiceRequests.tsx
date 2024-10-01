import React, { Fragment, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetServiceRequests } from "@/services/hooks/queries";
import { RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { RequestStatus, RequestType, type FetchedServiceRequest, type FetchedServiceRequestsCount, type FetchedServiceRequestsCountStatus } from "@/types/service-requests";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { useNavigate } from "react-router-dom";
import { ServiceRequestsFilter } from "@/components/pages/service-request";

export const ServiceRequestsPage: React.FC = () => {
    const navigate = useNavigate()
    const itemsPerPage = 10;
    const [page, setPage] = useState(1)
    const { value, onChangeHandler } = useDebounce(500)
    const [filters, setFilters] = useState({
      start_date: "",
      end_date: "",
      status: ""
    })
    const { data: serviceRequestCountStatus, isFetching: fetchingServiceRequestStatus } = useGetServiceRequests<FetchedServiceRequestsCountStatus>({ component: "count-status" })
    const { data: serviceRequestCount, isFetching: fetchingServiceRequestCount } = useGetServiceRequests<FetchedServiceRequestsCount>({ component: "count", q: value, ...filters })
    const { data: serviceRequests, isFetching: fetchingServiceRequests } = useGetServiceRequests<FetchedServiceRequest[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

    const columns = [
      {
        header: () => "Date & Time",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedServiceRequest
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
          )
        }
      },
      {
        header: () => "Request Type",
        accessorKey: "request_type",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedServiceRequest
          return (
            <div className="text-sm text-grey-dark-2 capitalize whitespace-nowrap">{pascalCaseToWords(RequestType[item.request_type])}</div>
          )
        }
      },
      {
        header: () => "Vehicle Plate No.",
        accessorKey: "plate_number",
      },
      {
        header: () => "Milage",
        accessorKey: "mileage",
      },
      {
        header: () => "Battery Health",
        accessorKey: "data_mode",
        cell: () => {
          return (
            <div className="flex items-center gap-1 text-dark-green-1"><Icon icon="material-symbols-light:bolt" className="text-green-1" />0%</div>
          )
        }
      },
      {
        header: () => "Driver Name",
        accessorKey: "driver_data._id",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedServiceRequest
          return (
            <div className="text-sm text-grey-dark-2 whitespace-nowrap">{item?.driver_data?.first_name} {item?.driver_data?.last_name}</div>
          )
        }
      },
      {
        header: () => "Status",
        accessorKey: "status",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedServiceRequest
          return (
            <div className={cn("text-sm font-medium capitalize whitespace-nowrap", item.status == 0 && "text-semantics-amber", item.status == 4 && "text-semantics-error", item.status == 3 && "text-semantics-success", item.status == 1 && "text-blue-500", item.status == 2 && "text-grey-dark-1")}>{pascalCaseToWords(RequestStatus[item.status])}</div>
          )
        }
      },
    ];

    const handlePageChange = (page: number) => {
      // in a real page, this function would paginate the data from the backend
      setPage(page)
    };

    const requests = [
        { label: "Total Request", value: serviceRequestCountStatus?.total, className: "bg-[#F8F9FB]" },
        { label: "Completed Requests", value: serviceRequestCountStatus?.total_complete, className: "bg-green-4" },
        { label: "Pending Requests", value: serviceRequestCountStatus?.total_pending, className: "bg-yellow-4" },
        { label: "Rejected Requests", value: serviceRequestCountStatus?.total_rejected, className: "bg-light-red" },
    ]
    
    return (
      <Fragment>
        <RenderIf condition={!fetchingServiceRequestStatus}>
          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
              <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Service Request</h1>
              <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
                  <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
                      <div className="w-full md:w-1/3 xl:w-1/4">
                          <SearchInput placeholder="Search name, ref etc" onChange={onChangeHandler} />
                      </div>
                  
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <TableAction theme="ghost" block>
                            <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                            Export
                        </TableAction>
                        <ServiceRequestsFilter setFilters={setFilters} isLoading={fetchingServiceRequestCount || fetchingServiceRequests}  />
                      </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                      {
                          requests.map((request) =>
                              <div className={cn("grid gap-1 p-4 rounded-lg relative overflow-hidden", request.className)}>
                                  <Icon icon="heroicons:wrench-screwdriver-solid" className="absolute -left-7 inset-y-0 my-auto text-grey-dark-3/10 size-20" />
                                  <h5 className="text-sm text-grey-dark-2 text-center">{request.label}</h5>
                                  <p className="text-3xl text-grey-dark-1 text-center">{request.value}</p>
                              </div>
                          )
                      }
                  </div>
                  <RenderIf condition={!fetchingServiceRequestCount && !fetchingServiceRequests}>
                    <Table
                        page={page}
                        columns={columns}
                        perPage={itemsPerPage}
                        data={serviceRequests ?? []}
                        onPageChange={handlePageChange}
                        onClick={({ original }) => navigate(`${original.service_req_id}?driver_id=${original.driver_data._id}`)}
                        totalCount={serviceRequestCount?.total}
                        emptyStateText="No service request has been made."
                    />
                  </RenderIf>
                  <RenderIf condition={fetchingServiceRequestCount || fetchingServiceRequests}>
                    <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                  </RenderIf>
              </div>
          </motion.div>
        </RenderIf>
        <RenderIf condition={fetchingServiceRequestStatus}>
          <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </Fragment>
    )
}