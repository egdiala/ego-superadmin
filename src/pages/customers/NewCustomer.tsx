import React, { useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { format, formatRelative } from "date-fns";
import { FetchedVehicleType } from "@/types/vehicles";
import { PurchaseModel } from "@/types/organizations";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useCreateOrganization } from "@/services/hooks/mutations";
import { createOrganizationSchema } from "@/validations/organizations";
import { useGetIndustries, useGetVehicles } from "@/services/hooks/queries";
import { Breadcrumb, Button, Input, RenderIf, SearchInput, SelectInput, Table } from "@/components/core";

export const NewCustomersPage: React.FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const { data: vehicles, isFetching: isFetchingVehicles } = useGetVehicles()
    const { data: fetchedIndustries, isFetching } = useGetIndustries()
    const { mutate: create, isPending: isCreating } = useCreateOrganization((res) => {
      console.log(res);
      setStep(2)
    })

    const industries = useMemo(() => {
        return fetchedIndustries?.sort((a, b) => a?.id > b?.id ? 1 : -1)?.map((item) => ({ label: item?.label, value: item?.label }))
    },[fetchedIndustries])
    
    const companyTypes = [
        { label: "Sole Proprietorship", value: "Sole Proprietorship" },
        { label: "Partnership", value: "Partnership" },
        { label: "Limited Liability Company", value: "Limited Liability Company" },
        { label: "Corporation", value: "Corporation" },
    ]
    
    const models = [
        { label: "Lease Model", value: PurchaseModel.Lease.toString() },
        { label: "E-Hailing Model", value: PurchaseModel.EHailing.toString() },
        { label: "Staff Commute Model", value: PurchaseModel.StaffCommute.toString() },
    ]

    const { handleSubmit, isValid, register } = useFormikWrapper({
        initialValues: {
            purchase_model: "",
            email: "",
            name: "",
            business_id: "",
            industry: "",
            company_type: "",
            vehicle_purchase: "",
            employee_no: "",
            company_tin: "",
            authorize_rep_name: "",
            authorize_rep_email: "",
            authorize_rep_phone: "",
        },
        validationSchema: createOrganizationSchema,
        onSubmit(values) {
            create(values)
        },
    })

    const columns = [
      {
        header: () => "Reg. Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: any; }) => {
          const item = row?.original as FetchedVehicleType
          return (
            <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split("at")[0]}</span> • {format(item?.createdAt, "p")}</div>
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
      },
      {
        header: () => "Action",
        accessorKey: "actions",
        size: 50, // used 70 because I have two action buttons, 50 is ideal for 1 button
        cell: () => (
            <button onClick={() => {}} className="py-2 px-2 group hover:bg-green-1 hover:border-green-1 rounded-lg border border-grey-dark-4 ease-out transition-colors duration-300">
              <Icon
                icon="gg:assign"
                className="size-5 text-grey-dark-3 group-hover:text-white"
              />
            </button>
        ),
      },
    ];

  const handlePageChange = () => {
    // in a real page, this function would paginate the data from the backend

  };

  const getData = () => {
    // in a real page, this function would paginate the data from the backend

  };

  return (
      <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
          <Breadcrumb items={[{ label: "All Customers", link: "/customers" }, { label: "Add New Customer", link: "/customers/new" }]} showBack />
          <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
                  <div className="grid gap-1">
                      <h1 className="font-bold text-xl text-grey-dark-1">Assign Vehicle to Customer</h1>
                      <p className="text-sm text-grey-dark-3">Select the vehicles you want to assign to this customer</p>
                  </div>
                  <ol className="flex items-center gap-4 list-inside list-decimal">
                      <li className="font-semibold text-sm text-green-1">Add customer details</li>
                      <li className={cn(step > 1 ? "text-green-1 font-semibold" : "text-grey-dark-3 font-normal", "text-sm")}>Assign vehicle</li>
                  </ol>
              </div>
              <AnimatePresence mode="popLayout">
                  {
                      step === 1 && (
                          <motion.form onSubmit={handleSubmit} variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
                              <div className="grid gap-6 pb-14">
                                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                      <SelectInput label="EV Purchase Model (Multiple select)" options={models} {...register("purchase_model")} />
                                      <Input label="Registered Business Name" type="text" {...register("name")} />
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                      <Input label="CAC Registration Number" inputMode="numeric" type="text" {...register("business_id")} />
                                      <Input label="Business Email  Address" inputMode="email" {...register("email")} />
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                      <SelectInput label="Industry" options={industries ?? []} disabled={isFetching} {...register("industry")} />
                                      <SelectInput label="Company Type" options={companyTypes} {...register("company_type")} />
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                      <Input label="Company Tax Identification Number" type="text" {...register("company_tin")} />
                                      <Input label="Number of Vehicles Purchased" type="text" {...register("vehicle_purchase")} />
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                      <Input label="Number of Employees" type="text" {...register("employee_no")} />
                                      <Input label="Authorized Rep Name and Title" type="text" {...register("authorize_rep_name")} />
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                      <Input label="Authorized Rep Email" type="text" {...register("authorize_rep_email")} />
                                      <Input label="Authorized Rep Phone Number" type="text" {...register("authorize_rep_phone")} />
                                  </div>
                              </div>
                              <div className="flex items-center justify-end md:w-1/2 xl:w-1/6 ml-auto pt-10 gap-2 md:gap-4 w-full">
                                  <Button type="button" theme="tertiary" onClick={() => navigate("/customers")} block>Cancel</Button>
                                  <Button type="submit" theme="primary" loading={isCreating} disabled={isCreating || !isValid}  block>Next</Button>
                              </div>
                          </motion.form>
                      )
                  }
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                  {
                      step === 2 && (
                          <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
                              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                                  <div className="w-full md:w-1/3 xl:w-1/4">
                                      <SearchInput placeholder="Search name, ref etc" />
                                  </div>
                                  
                                  <div className="flex items-center text-sm text-grey-dark-2 px-2 py-2.5 rounded bg-green-4">
                                      Vehicles Selected: &nbsp;<span className="font-semibold text-green-1">46</span>
                                  </div>
                              </div>
                              <RenderIf condition={!isFetchingVehicles}>
                                <Table
                                    getData={getData}
                                    columns={columns}
                                    data={vehicles ?? []}
                                    totalCount={vehicles?.length}
                                    onPageChange={handlePageChange}
                                    emptyStateText="You have not added any vehicle yet."
                                />
                                <div className="flex items-center justify-end md:w-1/2 xl:w-1/6 ml-auto pt-10 gap-2 md:gap-4 w-full">
                                    <Button type="button" theme="tertiary" onClick={() => setStep(1)} block>Previous</Button>
                                    <Button type="button" theme="primary"block>Add Customer</Button>
                                </div>
                              </RenderIf>
                              <RenderIf condition={isFetchingVehicles}>
                                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
                              </RenderIf>
                          </motion.div>
                      )
                  }
              </AnimatePresence>
          </div>
      </motion.div>
  )
}