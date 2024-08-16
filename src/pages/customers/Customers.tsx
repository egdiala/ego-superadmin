import React, { useCallback } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/core/Button/Loader";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { pageVariants } from "@/constants/animateVariants";
import { useGetOrganizations } from "@/services/hooks/queries";
import { PurchaseModel, type FetchedOrgaizationType } from "@/types/organizations";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { format, formatRelative } from "date-fns";

export const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: drivers, isFetching } = useGetOrganizations()

  const columns = [
    {
      header: () => "Date & Time",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedOrgaizationType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{formatRelative(item?.createdAt, new Date()).split("at")[0]}</span> • {format(item?.createdAt, "p")}</div>
        )
      }
    },
    {
      header: () => "Business Name",
      accessorKey: "name",
    },
    {
      header: () => "EV Purchase Model",
      accessorKey: "purchase_model",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedOrgaizationType
        return (
          <div>{pascalCaseToWords(PurchaseModel[item.purchase_model])}</div>
        )
      }
    },
    {
      header: () => "Email",
      accessorKey: "email",
    },
    {
      header: () => "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedOrgaizationType
        return (
          <div className={cn(item?.status === 1 ? "text-green-1" : "text-grey-dark-1", "font-medium text-sm")}>{item?.status === 1 ? "Active" : "Suspended"}</div>
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

  const toggleCreateOrganization = useCallback(() => {
    navigate("/customers/new")
  }, [navigate])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Customers</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name, reference etc" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction theme="grey" block>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
            </div>
            <div className="w-full sm:w-auto">
              <Button theme="primary" onClick={toggleCreateOrganization} block>
                <Icon icon="ph:plus" className="size-4" />
                Add New Customer
              </Button>
            </div>
          </div>
        </div>
        <RenderIf condition={!isFetching}>
          <Table
            columns={columns}
            data={drivers ?? []}
            getData={getData}
            perPage={10}
            totalCount={drivers?.length}
            onPageChange={handlePageChange}
            emptyStateText="You have not added any customer yet."
            onClick={({ original }) => navigate(`/customers/${original?.organization_id}/dashboard`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
    </motion.div>
  )
}