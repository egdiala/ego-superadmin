import React, { Fragment, useMemo } from "react";
import { motion } from "framer-motion";
import { PurchaseModel } from "@/types/organizations";
import { Loader } from "@/components/core/Button/Loader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { pageVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useEditOrganization } from "@/services/hooks/mutations";
import { createOrganizationSchema } from "@/validations/organizations";
import { useGetIndustries, useGetOrganization } from "@/services/hooks/queries";
import { Breadcrumb, Button, Input, RenderIf, SelectInput } from "@/components/core";
import { hasPermission } from "@/hooks/usePermissions";

export const EditCustomerPage: React.FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const isPermitted = hasPermission("CUSTOMER_DATA", "update")
    const { data: customer, isFetching: isFetchingCustomer } = useGetOrganization(params?.id as string)
    const { data: fetchedIndustries, isFetching } = useGetIndustries()
    const { mutate: edit, isPending: isCreating } = useEditOrganization(() => navigate(-1))

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

    const { handleSubmit, isValid, register, dirty, values } = useFormikWrapper({
        initialValues: {
            purchase_model: customer?.purchase_model?.toString() || "",
            email: customer?.email || "",
            name: customer?.name || "",
            business_id: customer?.business_id || "",
            industry: customer?.company_industry || "",
            company_type: customer?.company_type || "",
            vehicle_purchase: customer?.vehicle_purchase?.toString() || "",
            company_tin: customer?.company_tin || "",
            authorize_rep_firstname: customer?.authorize_rep_firstname || "",
            authorize_rep_lastname: customer?.authorize_rep_lastname || "",
            authorize_rep_email: customer?.authorize_rep_email || "",
            authorize_rep_phone: customer?.authorize_rep_phone || ""
        },
        enableReinitialize: true,
        validationSchema: createOrganizationSchema,
        onSubmit: () => {
            edit({ auth_id: customer?.organization_id as string, ...values })
        },
    })

    if (!isPermitted) {
        return <Navigate to="/customers" replace />;
    }

    return (
        <Fragment>
            <RenderIf condition={!isFetching && !isFetchingCustomer}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "All Customers", link: "/customers" }, { label: customer?.name as string, link: `/customers/${params?.id}/dashboard` }, { label: "Edit Customer", link: `/customers/${params?.id}/edit` }]} showBack />
                    <div className="grid content-start gap-4 py-6 px-4 bg-white rounded-lg">
                        <h1 className="font-bold text-xl text-grey-dark-1">Edit Customer</h1>
                            <motion.form onSubmit={handleSubmit} variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-4">
                                <div className="grid gap-6 pb-14">
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <SelectInput label="EV Purchase Model (Multiple select)" options={models} {...register("purchase_model")} />
                                        <Input label="Registered Business Name" type="text" {...register("name")} />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="CAC Registration Number" inputMode="numeric" type="text" {...register("business_id")} />
                                        <Input label="Business Email Address" inputMode="email" {...register("email")} />
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
                                        <Input label="Authorized Rep First Name" type="text" {...register("authorize_rep_firstname")} />
                                        <Input label="Authorized Rep Last Name" type="text" {...register("authorize_rep_lastname")} />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                                        <Input label="Authorized Rep Email" type="text" {...register("authorize_rep_email")} />
                                        <Input label="Authorized Rep Phone Number" type="text" {...register("authorize_rep_phone")} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end md:w-1/2 xl:w-2/6 ml-auto pt-10 gap-2 md:gap-4 w-full">
                                    <Button type="button" theme="tertiary" onClick={() => navigate(`/customers/${params?.id}/dashboard`)} block>Cancel</Button>
                                    <Button type="submit" theme="primary" loading={isCreating} disabled={isCreating || !isValid || !dirty}  block>Update</Button>
                                </div>
                            </motion.form>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching || isFetchingCustomer}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}