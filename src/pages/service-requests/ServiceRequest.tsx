import React, { Fragment, useCallback, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import blankImg from "@/assets/blank.svg";
import vehicleImg from "@/assets/vehicle.svg";
import { Loader } from "@/components/core/Button/Loader";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { FetchedRatingCountStatus } from "@/types/ratings";
import { pageVariants } from "@/constants/animateVariants";
import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, RenderIf, TableAction } from "@/components/core";
import { RequestStatus, RequestType } from "@/types/service-requests";
import { UpdateRequestModal, ViewRequestImageModal } from "@/components/pages/service-request";
import { useGetRatings, useGetServiceRequest } from "@/services/hooks/queries";

export const ServiceRequestPage: React.FC = () => {
    const params = useParams()
    const [searchParams] = useSearchParams()
    const { data: serviceRequest, isFetching } = useGetServiceRequest(params?.id as string)
    const { data: countStatus, isFetching: fetchingCountStatus } = useGetRatings({ component: "count-status", user_type: "driver", auth_id: searchParams.get("driver_id") as string })
    const [toggleModals, setToggleModals] = useState({
        openUpdateRequestModal: false,
        openViewImageModal: false,
    })
  
    const toggleUpdateRequestStation = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openUpdateRequestModal: !toggleModals.openUpdateRequestModal,
      }))
    }, [toggleModals.openUpdateRequestModal])
  
    const toggleViewRequestImage = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openViewImageModal: !toggleModals.openViewImageModal,
      }))
    }, [toggleModals.openViewImageModal])
    
    const timeline = useMemo(() => {
        if (serviceRequest === undefined) {
            return []
        }
        return [
            {
                label: "Pending",
                address: {
                    name: format(serviceRequest?.createdAt, "dd MMM, yyyy"),
                    street: format(serviceRequest?.createdAt, "p"),
                },
                status: serviceRequest?.status === 0 ? "ongoing" : "done"
            },
            {
                label: "Scheduled",
                address: {
                    name: format(serviceRequest?.comment?.find((comment) => comment?.status === 1)?.createdAt! ?? serviceRequest?.updatedAt, "dd MMM, yyyy"),
                    street: format(serviceRequest?.comment?.find((comment) => comment?.status === 1)?.createdAt! ?? serviceRequest?.updatedAt, "p"),
                },
                status: serviceRequest?.status === 1 ? "ongoing" : serviceRequest?.status! < 1 ? "pending" : "done"
            },
            {
                label: "In-progress",
                address: {
                    name: format(serviceRequest?.comment?.find((comment) => comment?.status === 2)?.createdAt! ?? serviceRequest?.updatedAt, "dd MMM, yyyy"),
                    street: format(serviceRequest?.comment?.find((comment) => comment?.status === 2)?.createdAt! ?? serviceRequest?.updatedAt, "p"),
                },
                status: serviceRequest?.status === 2 ? "ongoing" : serviceRequest?.status! < 2 ? "pending" : "done"
            },
            {
                label: "Completed",
                address: {
                    name: format(serviceRequest?.comment?.find((comment) => comment?.status === 3)?.createdAt! ?? serviceRequest?.updatedAt, "dd MMM, yyyy"),
                    street: format(serviceRequest?.comment?.find((comment) => comment?.status === 3)?.createdAt! ?? serviceRequest?.updatedAt, "p"),
                },
                status: serviceRequest?.status === 3 ? "ongoing" : serviceRequest?.status! < 3 ? "pending" : "done"
            }
        ]
    },[serviceRequest])

    const details = useMemo(() => {
        if (serviceRequest === undefined) {
            return []
        }
        return [
            { label: "Date", value: <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(serviceRequest?.createdAt as Date, "dd MMM, yyyy")}</span> • {format(serviceRequest?.createdAt as Date, "p")}</div> },
            { label: "Request Type", value: pascalCaseToWords(RequestType[serviceRequest?.request_type]) },
            { label: "Mileage", value: serviceRequest?.mileage },
        ]
    },[serviceRequest])
    return (
        <Fragment>
            <RenderIf condition={!isFetching && !fetchingCountStatus}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "Service Request", link: "/service-request" }, { label: "ABC 123 DEF", link: "/service-request/1" }]} showBack />
                    <div className="grid content-start gap-5 p-4 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="text-grey-dark-1 font-bold text-xl">ABC 123 DEF</h1>
                            <div className="flex items-center gap-2 pb-4 w-full sm:w-auto">
                                <TableAction type="button" theme="primary" block onClick={toggleUpdateRequestStation}>
                                    <Icon icon="mdi:pencil" className="size-4" />
                                    Update Request
                                </TableAction>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-4 py-4 px-5 bg-green-4 rounded-lg">
                                {
                                    timeline.map((item, idx) =>
                                    <div key={idx} className="grid pr-0.5">
                                        <span className="text-dark-green-1 text-xs mb-2.5">{item.label}</span>
                                        <div className="relative flex items-center gap-0.5">
                                            <div className={cn("grid place-content-center size-5 rounded-full", item.status === "pending" ? "bg-grey-dark-3" : "bg-green-1")}>
                                                <Icon icon={item.status === "done" ? "radix-icons:check" : "carbon:dot-mark"} className="text-white size-4" />
                                            </div>
                                            <RenderIf condition={(timeline.length - 1) !== idx}>
                                                <div className="relative flex flex-1">
                                                    <div className={cn("absolute flex items-center rounded bg-green-1 z-10 -mt-[1px]", item.status === "ongoing" && "w-0 p-0", item.status === "done" && "w-full p-0.5", item.status === "pending" && "w-0 p-0")} />
                                                    <div className="relative bg-grey-dark-3 left-0 right-0 p-px flex-1 rounded" />
                                                    
                                                </div>
                                            </RenderIf>
                                        </div>
                                        <div className="mt-3.5">
                                            <span className="text-sm font-medium text-grey-dark-1">{item.address.name}</span>
                                            <p className="text-xs text-grey-dark-2 lowercase">{item.address.street.replace(" ", "")}</p>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                            <div className="flex items-center gap-12 py-4 px-5 rounded-xl border border-input-filled">
                                <div className="grid gap-2 pr-8 md:border-r md:border-r-input-filled">
                                    <img src={vehicleImg} alt="vehicle" className="md:w-auto w-56" />
                                    <div className="grid gap-1 md:text-center">
                                        <h1 className="font-semibold text-xl text-grey-dark-1">{serviceRequest?.plate_number}</h1>
                                        <p className="text-sm text-grey-dark-1">{serviceRequest?.vehicle_data?.car_color}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-8 flex-1">
                                    {
                                        details?.map((item) => 
                                            <div key={item.label} className="grid gap-1">
                                                <h4 className="text-sm text-grey-dark-3">{item?.label}</h4>
                                                <p className="text-sm text-grey-dark-1">{item?.value}</p>
                                            </div>
                                        )
                                    }
                                    <div className="grid gap-1">
                                        <h4 className="text-sm text-grey-dark-3">Request Status</h4>
                                        <p className={cn("text-sm w-fit px-2 py-0.5 rounded", serviceRequest?.status == 0 && "bg-yellow-1 text-grey-dark-1", serviceRequest?.status == 4 && "bg-red-100 text-semantics-error", serviceRequest?.status == 3 && "bg-green-100 text-semantics-success", serviceRequest?.status == 1 && "bg-blue-50 text-blue-500", serviceRequest?.status == 2 && "bg-gray-100 text-grey-dark-1")}>{pascalCaseToWords(RequestStatus[serviceRequest?.status ?? 0])}</p>
                                    </div>
                                    <div className="grid gap-1">
                                        <h4 className="text-sm text-grey-dark-3">Battery Health</h4>
                                        <p className="text-sm text-grey-dark-1">0%</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img
                                            alt={serviceRequest?.driver_data?.first_name}
                                            className="size-10 rounded-full object-cover object-center"
                                            src={blankImg}
                                        />
                                        <div className="grid gap-0.5">
                                            <h2 className="font-medium text-sm text-grey-dark-1">{serviceRequest?.driver_data?.first_name} {serviceRequest?.driver_data?.last_name}</h2>
                                            <div className="flex items-center gap-1">
                                                <Icon icon="ph:star-fill" className="text-semantics-amber size-3.5" />
                                                <span className="text-sm text-grey-dark-3">{(countStatus as FetchedRatingCountStatus)?.rating?.toFixed(1) ?? "0"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-6 rounded-lg border border-input-filled py-4 px-5">
                                    <h2 className="font-semibold text-base text-grey-dark-1">Uploaded Images</h2>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        {
                                            Array.from({ length: 8 }).map((_, idx) =>
                                                <div key={idx} className="size-28 rounded-lg overflow-hidden relative">
                                                    <img src="https://images.pexels.com/photos/515674/pexels-photo-515674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="engine" className="object-cover object-center size-28" />
                                                    <button type="button" onClick={toggleViewRequestImage} className="absolute p-0.5 bottom-1.5 right-1.5 size-3.5 bg-white rounded-sm grid place-content-center" style={{ boxShadow: "0px 0px 5.85px -0.93px rgba(10, 75, 75, 0.2)" }}>
                                                        <Icon icon="lucide:scan" className="text-green-1 size-2.5" />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6 rounded-lg border border-input-filled py-4 px-5">
                                    <h2 className="text-sm text-grey-dark-3">Request Description</h2>
                                    <div className="test-sm text-grey-dark-2">
                                        Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis nulla arcu in semper tortor. Sagittis suspendisse ultricies.Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam 
                                        Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis nulla arcu in semper tortor. Sagittis suspendisse ultricies.Lorem ipsum dolor 
                                        Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis nulla arcu in semper tortor. Sagittis suspendisse ultricies.Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam 
                                        Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis 
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 rounded-lg border border-input-filled py-4 px-5">
                                    <h2 className="text-sm text-grey-dark-3">Schedule info</h2>
                                    <p className="test-sm text-grey-dark-2">Today • 12:34pm</p>
                                    <div className="test-sm text-grey-dark-2">
                                        Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis nulla arcu in semper tortor. Sagittis suspendisse ultricies.Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam 
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 rounded-lg border border-input-filled py-4 px-5">
                                    <h2 className="text-sm text-grey-dark-3">In-progress info</h2>
                                    <p className="test-sm text-grey-dark-2">Today • 12:34pm</p>
                                    <div className="test-sm text-grey-dark-2">
                                        Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam ultricies risus ut leo. Massa rhoncus mauris egestas duis nulla arcu in semper tortor. Sagittis suspendisse ultricies.Lorem ipsum dolor sit amet consectetur. Duis ornare velit vitae lacus ipsum euismod. Nullam 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UpdateRequestModal isOpen={toggleModals.openUpdateRequestModal} close={toggleUpdateRequestStation} request={serviceRequest!} />
                    <ViewRequestImageModal isOpen={toggleModals.openViewImageModal} close={toggleViewRequestImage} />
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching || fetchingCountStatus}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}