import React, { Fragment, useEffect, useMemo } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PurchaseModel } from "@/types/organizations";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetOrganization } from "@/services/hooks/queries";
import { Breadcrumb, RenderIf, TableAction } from "@/components/core";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

export const CustomerPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { data: customer, isFetching } = useGetOrganization(params?.id as string)
  
  const subRoutes = useMemo(() => {
    const subs = [
        { name: "Dashboard", link: `/customers/${params?.id as string}/dashboard` },
        (PurchaseModel.Lease === customer?.purchase_model! && { name: "Vehicles", link: `/customers/${params?.id as string}/vehicles` }),
        (PurchaseModel.Lease === customer?.purchase_model! && { name: "Drivers", link: `/customers/${params?.id as string}/drivers` }),
        { name: "Staff", link: `/customers/${params?.id as string}/staff` },
        { name: "Trip History", link: `/customers/${params?.id as string}/trip-history` },
        { name: "Wallet", link: `/customers/${params?.id as string}/wallet` },
        { name: "Trip Payments", link: `/customers/${params?.id as string}/trip-payments` },
        { name: "Ratings", link: `/customers/${params?.id as string}/ratings` },
    ]
    return subs.filter((item) => item !== false)
  },[customer?.purchase_model, params?.id])

  useEffect(() => {
    if (!customer?.business_id && !isFetching) {
      navigate("/customers")
    }
  },[customer, isFetching, navigate])
  return (
    <Fragment>
      <RenderIf condition={!isFetching}>
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
          <Breadcrumb items={[{ label: "All Customers", link: "/customers" }, { label: customer?.name as string, link: `/customers/${params?.id as string}/dashboard` }, { label: "Dashboard", link: `/customers/${params?.id as string}/dashboard` }]} showBack />
          <div className="grid content-start gap-6 py-6 px-4 bg-white rounded-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-grey-dark-1 font-bold text-xl">{customer?.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 pb-4 w-full sm:w-auto">
                <div className="grid grid-cols-2 gap-2">
                    <TableAction theme="ghost" block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                    <TableAction theme="grey" block>
                        <Icon icon="lucide:pencil" className="size-4" />
                        Edit
                    </TableAction>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <TableAction theme="secondary" block>
                        <Icon icon="ph:exclamation-mark-bold" className="size-4" />
                        Suspend Customer
                    </TableAction>
                    <TableAction theme="primary" block>
                        <Icon icon="lucide:plus" className="size-4" />
                        Assign Vehicles
                    </TableAction>
                </div>
              </div>
            </div>
            <div className="rounded border-2 border-grey-dark-4 p-1 flex items-center gap-2 w-full overflow-scroll">
              {
                subRoutes.map((route, idx) => 
                <Fragment key={route.link}>
                  <NavLink to={route.link} className="flex w-full">
                  {({ isActive }) => (
                      <div className={cn("text-center py-1 px-5 flex-1 rounded whitespace-nowrap", isActive ? "bg-green-1 text-white font-semibold text-sm" : "hover:bg-light-green")}>
                          {route.name}
                      </div>
                  )}
                  </NavLink>
                  <RenderIf condition={(subRoutes.length - 1) !== idx}><hr className="w-64 block border-input-filled rotate-90" /></RenderIf>
                </Fragment>
                )
              }
            </div>
            <Outlet />
          </div>
        </motion.div>
      </RenderIf>
      <RenderIf condition={isFetching}>
        <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
      </RenderIf>
    </Fragment>
  )
}