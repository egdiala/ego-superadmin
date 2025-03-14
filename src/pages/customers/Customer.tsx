import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PurchaseModel } from "@/types/organizations";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetOrganization } from "@/services/hooks/queries";
import { Breadcrumb, Button, RenderIf, TableAction } from "@/components/core";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { SuspendCustomerModal } from "@/components/pages/customers";
import { RenderFeature } from "@/hooks/usePermissions";
import { useReactToPrint } from "react-to-print";

export const CustomerPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => contentRef.current });
  const { data: customer, isFetching } = useGetOrganization(params?.id as string)
  const [toggleModals, setToggleModals] = useState({
    openDeleteCustomerModal: false,
    openSuspendCustomerModal: false,
  })

  const toggleSuspendCustomer = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openSuspendCustomerModal: !toggleModals.openSuspendCustomerModal,
    }))
  }, [toggleModals.openSuspendCustomerModal])
  
  const subRoutes = useMemo(() => {
    const subs = [
        { label: "Dashboard", link: `/customers/${params?.id as string}/dashboard` },
        ((PurchaseModel.Lease) === customer?.purchase_model! && { label: "Vehicles", link: `/customers/${params?.id as string}/vehicles` }),
        ((PurchaseModel.Lease) === customer?.purchase_model! && { label: "Drivers", link: `/customers/${params?.id as string}/drivers` }),
        ((PurchaseModel.EHailing) === customer?.purchase_model! && { label: "Vehicles", link: `/customers/${params?.id as string}/vehicles` }),
        ((PurchaseModel.EHailing) === customer?.purchase_model! && { label: "Drivers", link: `/customers/${params?.id as string}/drivers` }),
        { label: "Staff", link: `/customers/${params?.id as string}/staffs` },
        { label: "Trip History", link: `/customers/${params?.id as string}/trip-history` },
        { label: "Wallet", link: `/customers/${params?.id as string}/wallet` },
        { label: "Trip Payments", link: `/customers/${params?.id as string}/trip-payments` },
        { label: "Ratings", link: `/customers/${params?.id as string}/ratings` },
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
          <Breadcrumb items={[{ label: "All Customers", link: "/customers" }, { label: customer?.name as string, link: `/customers/${params?.id as string}/dashboard` }, subRoutes.filter((item) => item?.link === location?.pathname)[0]]} showBack />
          <div className="grid content-start gap-6 py-6 px-4 bg-white rounded-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-grey-dark-1 font-bold text-xl">{customer?.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 pb-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <RenderIf condition={subRoutes[0].link === location.pathname}>
                    <TableAction theme="ghost" onClick={handlePrint} block>
                        <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                        Export
                    </TableAction>
                  </RenderIf>
                    <RenderFeature module="CUSTOMER_DATA" permission="update">
                      <TableAction type="button" theme="grey" onClick={() => navigate(`/customers/${params?.id as string}/edit`)} block>
                          <Icon icon="lucide:pencil" className="size-4" />
                          Edit
                      </TableAction>
                    </RenderFeature>
                </div>
                <RenderFeature module="CUSTOMER_DATA" permission="update">
                  <div className={cn("grid gap-2", (PurchaseModel.StaffCommute) !== customer?.purchase_model! ? "grid-cols-3" : "grid-cols-1")}>
                      <TableAction type="button" theme="secondary" onClick={toggleSuspendCustomer} block>
                          <Icon icon="ph:exclamation-mark-bold" className="size-4" />
                          {customer?.status === 1 ? "Suspend Customer" : "Unsuspend Customer"}
                      </TableAction>
                      <RenderIf condition={(PurchaseModel.StaffCommute) !== customer?.purchase_model!}>
                      <Button type="button" theme="danger" onClick={() => navigate(`/customers/${params?.id as string}/revoke`)} block>
                        <Icon icon="ph:trash-bold" className="size-4" />
                        Revoke Vehicle
                      </Button>
                      <TableAction type="button" theme="primary" onClick={() => navigate(`/customers/${params?.id as string}/assign`)} block>
                          <Icon icon="lucide:plus" className="size-4" />
                          Assign Vehicles
                      </TableAction>
                      </RenderIf>
                  </div>
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
                          {route.label}
                      </div>
                  )}
                  </NavLink>
                  <RenderIf condition={(subRoutes.length - 1) !== idx}><div className="h-full rounded w-0 block border-r border-r-input-filled" /></RenderIf>
                </Fragment>
                )
              }
            </div>
            <div ref={contentRef}>
              <Outlet />
            </div>
          </div>
          <SuspendCustomerModal isOpen={toggleModals.openSuspendCustomerModal} customer={customer!} close={toggleSuspendCustomer} />
        </motion.div>
      </RenderIf>
      <RenderIf condition={isFetching}>
        <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
      </RenderIf>
    </Fragment>
  )
}