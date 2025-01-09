import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/core/Button/Loader";
import { pascalCaseToWords } from "@/utils/textFormatter";
import { pageVariants } from "@/constants/animateVariants";
import { useGetOrganizations } from "@/services/hooks/queries";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, RenderIf, SearchInput, Table, TableAction } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { FetchedOrganizationCount, PurchaseModel, type FetchedOrgaizationType } from "@/types/organizations";
import { CustomersFilter } from "@/components/pages/customers";
import { RenderFeature } from "@/hooks/usePermissions";

export const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  const [page, setPage] = useState(1)
  const { value, onChangeHandler } = useDebounce(500)
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  })
  const [component, setComponent] = useState<"count" | "export" | "count-status">("count")
  const { data: count, isFetching: fetchingCount, refetch } = useGetOrganizations({ component, q: value, ...filters })
  const { data: drivers, isFetching } = useGetOrganizations({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value, ...filters })

  const columns = [
    {
      header: () => "Date & Time",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any; }) => {
        const item = row?.original as FetchedOrgaizationType
        return (
          <div className="text-sm text-grey-dark-2 lowercase whitespace-nowrap"><span className="capitalize">{format(item?.createdAt, "dd MMM, yyyy")}</span> • {format(item?.createdAt, "p")}</div>
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
          <div className={cn(item?.status === 1 ? "text-green-1" : "text-semantics-error", "font-medium text-sm")}>{item?.status === 1 ? "Active" : "Suspended"}</div>
        )
      }
    }
  ];

  const handlePageChange = (page: number) => {
    // in a real page, this function would paginate the data from the backend
    setPage(page)
      setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
  };

  useEffect(() => {
    getPaginationParams(location, setPage, () => {})
  }, [location, setPage])

  const toggleCreateOrganization = useCallback(() => {
    navigate("/customers/new")
  }, [navigate])
  
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Customers</h1>
      <div className="grid content-start gap-5 py-6 px-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <SearchInput placeholder="Search name, reference etc" onChange={onChangeHandler} />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="grey" block onClick={() => component === "export" ? refetch() : setComponent("export")}>
                <Icon icon="mdi:arrow-top-right-bold-box" className="size-4" />
                Export
              </TableAction>
              <CustomersFilter setFilters={setFilters} isLoading={isFetching || fetchingCount} />
            </div>
            <RenderFeature module="CUSTOMER_DATA" permission="create">
              <div className="w-full sm:w-auto">
                <Button theme="primary" onClick={toggleCreateOrganization} block>
                  <Icon icon="ph:plus" className="size-4" />
                  Add New Customer
                </Button>
              </div>
            </RenderFeature>
          </div>
        </div>
        <RenderIf condition={!isFetching && !fetchingCount}>
          <Table
            page={page}
            columns={columns}
            perPage={itemsPerPage}
            onPageChange={handlePageChange}
            data={drivers as FetchedOrgaizationType[]}
            emptyStateText="You have not added any customer yet."
            totalCount={(count as FetchedOrganizationCount)?.total}
            onClick={({ original }) => navigate(`/customers/${original?.organization_id}/dashboard`)}
          />
        </RenderIf>
        <RenderIf condition={isFetching || fetchingCount}>
          <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
        </RenderIf>
      </div>
    </motion.div>
  )
}