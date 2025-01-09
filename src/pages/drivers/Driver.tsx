import React, { Fragment, useCallback, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetDriver } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import { DeleteDriverModal, EditDriverModal, SuspendDriverModal } from "@/components/pages/drivers";
import { RenderFeature } from "@/hooks/usePermissions";

export const DriverPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { data: driver, isFetching } = useGetDriver(params?.id as string)
  const [toggleModals, setToggleModals] = useState({
    openDeleteDriverModal: false,
    openSuspendDriverModal: false,
    openEditDriverModal: false
  })

  const toggleSuspendDriver = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openSuspendDriverModal: !toggleModals.openSuspendDriverModal,
    }))
  }, [toggleModals.openSuspendDriverModal])

  const toggleDeleteDriver = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openDeleteDriverModal: !toggleModals.openDeleteDriverModal,
    }))
  }, [toggleModals.openDeleteDriverModal])

  const toggleEditDriver = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openEditDriverModal: !toggleModals.openEditDriverModal,
    }))
  }, [toggleModals.openEditDriverModal])
  
  const subRoutes = [
      { name: "Profile", link: `/drivers/${params?.id as string}/profile` },
      { name: "Trips", link: `/drivers/${params?.id as string}/trips` },
      { name: "Driver Payment", link: `/drivers/${params?.id as string}/driver-payment` },
      { name: "Ratings", link: `/drivers/${params?.id as string}/ratings` },
  ]

  useEffect(() => {
    if (!driver?.driver_id && !isFetching) {
      navigate("/drivers")
    }
  },[driver?.driver_id, isFetching, navigate])
  return (
    <Fragment>
      <RenderIf condition={!isFetching}>
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
          <Breadcrumb items={[{ label: "All Drivers", link: "/drivers" }, { label: `${driver?.first_name} ${driver?.last_name}`, link: `/drivers/${params?.id as string}/profile` }]} showBack />
          <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <h1 className="text-grey-dark-1 font-bold text-xl">{driver?.first_name} {driver?.last_name}</h1>
              <div className="flex items-center gap-2 pb-4 w-full sm:w-auto">
                <RenderFeature module="DRIVER_DATA" permission="update">
                  <Button type="button" theme="secondary" onClick={toggleEditDriver} block>
                    <Icon icon="ph:pencil-simple-line" className="size-4" />
                    Edit Driver
                  </Button>
                </RenderFeature>
                <RenderFeature module="DRIVER_DATA" permission="delete">
                  <Button type="button" theme="danger" onClick={toggleDeleteDriver} block>
                    <Icon icon="ph:trash-bold" className="size-4" />
                    Delete Driver
                  </Button>
                </RenderFeature>
                <RenderFeature module="DRIVER_DATA" permission="update">
                  <Button type="button" theme="primary" onClick={toggleSuspendDriver} block>
                    <Icon icon="ph:exclamation-mark-bold" className="size-4" />
                    {driver?.suspension_status === 0 ? "Suspend Driver" : "Unsuspend Driver"}
                  </Button>
                </RenderFeature>
              </div>
            </div>
            <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full overflow-scroll scrollbar-hide">
              {
                subRoutes.map((route, idx) => 
                <Fragment key={route.link}>
                  <NavLink to={route.link} className="flex w-full">
                  {({ isActive }) => (
                      <div className={cn("text-center py-1 px-5 flex-1 rounded whitespace-nowrap text-sm", isActive ? "bg-green-1 text-white font-semibold" : "hover:bg-light-green")}>
                          {route.name}
                      </div>
                  )}
                  </NavLink>
                  <RenderIf condition={(subRoutes.length - 1) !== idx}><div className="h-full rounded w-0 block border-r border-r-input-filled" /></RenderIf>
                </Fragment>
                )
              }
            </div>
            <Outlet />
          </div>
          <RenderFeature module="DRIVER_DATA" permission="delete">
            <DeleteDriverModal driver={driver!} isOpen={toggleModals.openDeleteDriverModal} close={toggleDeleteDriver} />
          </RenderFeature>
          <RenderFeature module="DRIVER_DATA" permission="update">
            <EditDriverModal isOpen={toggleModals.openEditDriverModal} close={toggleEditDriver} driver={driver!} />
            <SuspendDriverModal driver={driver!} isOpen={toggleModals.openSuspendDriverModal} close={toggleSuspendDriver} />
          </RenderFeature>
        </motion.div>
      </RenderIf>
      <RenderIf condition={isFetching}>
        <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
      </RenderIf>
    </Fragment>
  )
}