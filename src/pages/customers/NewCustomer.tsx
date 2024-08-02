import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Breadcrumb, Button, Input, SearchInput, SelectInput, Table } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { cn } from "@/libs/cn";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { makeData } from "@/hooks/makeData";
import { useGetIndustries } from "@/services/hooks/queries";

export const NewCustomersPage: React.FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const dummyData = makeData(50);
    const [data, setData] = React.useState(dummyData);
    const { data: fetchedIndustries, isFetching } = useGetIndustries()

    const industries = useMemo(() => {
        return fetchedIndustries?.sort((a, b) => a?.id > b?.id ? 1 : -1)?.map((item) => ({ label: item?.label, value: item?.id }))
    },[fetchedIndustries])
    
    const companyTypes = [
        { label: "Sole Proprietorship", value: "Sole Proprietorship" },
        { label: "Partnership", value: "Partnership" },
        { label: "Limited Liability Company", value: "Limited Liability Company" },
        { label: "Corporation", value: "Corporation" },
    ]

    const columns = [
      {
        header: () => "First Name",
        accessorKey: "firstName",
      },
      {
        header: () => "Last Name",
        accessorKey: "lastName",
      },
      {
        header: () => "Age",
        accessorKey: "age",
      },
      {
        header: () => "Visits",
        accessorKey: "visits",
      },
      {
        header: () => "Status",
        accessorKey: "status",
      },
      {
        header: () => "Profile Progress",
        accessorKey: "progress",
      },
      // strictly follow the setup for header, accessorkey and size for all 'Action' columns
      {
        header: () => "Action",
        accessorKey: "action",
        size: 70, // used 70 because I have two action buttons, 50 is ideal for 1 button
        cell: () => (
          <div className="w-fit flex items-center rounded border border-neutral-10 text-xs px-[2px]">
            <button onClick={() => {}} className="py-2 px-2">
              <Icon
                icon="ph:pencil-simple-line"
                className="text-neutral-base"
              />
            </button>
            <div className="h-7 w-[1px] border-r border-r-neutral-10 mx-[2px]"></div>
            <button className="py-2 px-2">
              <Icon icon="ph:user-switch" className="text-neutral-base" />
            </button>
          </div>
        ),
      },
    ];

    const paginateData = (currentPage: number, rowsPerPage: number) => {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const newData = dummyData.slice(startIndex, endIndex);
      setData(newData);
    };

    const handlePageChange = (currentPage: number, rowsPerPage: number) => {
      // in a real page, this function would paginate the data from the backend
      paginateData(currentPage, rowsPerPage);
    };

    const getData = (currentPage: number, rowsPerPage: number) => {
      // in a real page, this function would paginate the data from the backend
      paginateData(currentPage, rowsPerPage);
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
                            <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
                                <div className="grid gap-6 pb-14">
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="EV Purchase Model (Multiple select)" type="text" />
                                        <Input label="Registered Business Name" type="text" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="CAC Registration Number" type="text" />
                                        <Input label="Business Email  Address" type="text" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <SelectInput label="Industry" options={industries ?? []} disabled={isFetching} />
                                        <SelectInput label="Company Type" options={companyTypes} />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="Company Tax Identification Number" type="text" />
                                        <Input label="Number of Vehicles Purchased" type="text" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="Number of Employees" type="text" />
                                        <Input label="Authorized Rep Name and Title" type="text" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="Authorized Rep Email" type="text" />
                                        <Input label="Authorized Rep Phone Number" type="text" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end md:w-1/2 xl:w-1/6 ml-auto pt-10 gap-2 md:gap-4 w-full">
                                    <Button type="button" theme="tertiary" onClick={() => navigate("/customers")} block>Cancel</Button>
                                    <Button type="button" theme="primary" onClick={() => setStep(2)} block>Next</Button>
                                </div>
                            </motion.div>
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
                                <Table
                                    columns={columns}
                                    data={data}
                                    getData={getData}
                                    totalCount={dummyData.length}
                                    onPageChange={handlePageChange}
                                />
                                <div className="flex items-center justify-end md:w-1/2 xl:w-1/6 ml-auto pt-10 gap-2 md:gap-4 w-full">
                                    <Button type="button" theme="tertiary" onClick={() => setStep(1)} block>Previous</Button>
                                    <Button type="button" theme="primary" block>Add Customer</Button>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </motion.div>
    )
}