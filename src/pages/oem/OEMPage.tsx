import React, { Fragment, useCallback, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { useGetOEM } from "@/services/hooks/queries"
import { Breadcrumb, Button, RenderIf } from "@/components/core"
import { format } from "date-fns"
import { CreateModelModal, DeleteModelModal, DeleteOEMModal, EditOEMModal } from "@/components/pages/oem"
import vehicleImg from "@/assets/vehicle.svg";
import { FetchedOEMType } from "@/types/oem"

export const ViewOEM: React.FC = () => {
    const params = useParams()
    const { data: oem, isFetching } = useGetOEM(params?.id as string)

    const [toggleModals, setToggleModals] = useState({
        openDeleteOemModal: false,
        openDeleteModelModal: false,
        openEditOemModal: false,
        openCreateModel: false,
        modelId: "",
        model: "" as unknown as FetchedOEMType["model_data"][0]
    })
  
    const toggleDeleteOem = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteOemModal: !toggleModals.openDeleteOemModal,
      }))
    }, [toggleModals.openDeleteOemModal])
    
    const toggleDeleteModel = useCallback((id: string) => {
      setToggleModals((prev) => ({
        ...prev,
        modelId: id,
        openDeleteModelModal: !toggleModals.openDeleteModelModal,
      }))
    }, [toggleModals.openDeleteModelModal])
  
    const toggleEditOem = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openEditOemModal: !toggleModals.openEditOemModal,
      }))
    }, [toggleModals.openEditOemModal])

    const toggleCreateModel = useCallback((id: string) => {
      setToggleModals((prev) => ({
        ...prev,
        modelId: id,
        openCreateModel: !toggleModals.openCreateModel,
      }))
    }, [toggleModals.openCreateModel])

    const toggleEditModel = useCallback((item: FetchedOEMType["model_data"][0]) => {
      setToggleModals((prev) => ({
        ...prev,
        model: item,
        openCreateModel: !toggleModals.openCreateModel,
      }))
    }, [toggleModals.openCreateModel])

    const details = useMemo(() => {
        return [
            { label: "OEM Name", value: oem?.oem_name },
            { label: "Models", value: oem?.model_data?.length },
            { label: "Date Created", value: <><span className="capitalize">{format(oem?.createdAt || new Date(), "dd MMM, yyyy")}</span> • {format(oem?.createdAt || new Date(), "p")}</> },
        ]
    },[oem?.createdAt, oem?.model_data?.length, oem?.oem_name])
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "OEM", link: "/oem" }, { label: oem?.oem_name as string, link: `/oem/${params?.id as string}` }]} showBack />
                    <div className="grid content-start gap-4 p-4 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-xl text-grey-dark-1 capitalize">{oem?.oem_name}</h1>
                            <div className="flex items-center gap-2">
                                <Button type="button" theme="danger" onClick={toggleDeleteOem}>
                                    <Icon icon="lucide:trash-2" className="size-5" />
                                    Delete OEM
                                </Button>
                                <Button type="button" theme="tertiary" onClick={toggleEditOem}>
                                    <Icon icon="lucide:pencil" className="size-5" />
                                    Edit OEM Name
                                </Button>
                                <Button type="button" theme="primary" onClick={() => toggleCreateModel("")} block>
                                    <Icon icon="ph:plus" className="size-4" />
                                    Add Model
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-10 py-4 px-5 bg-[#F6FBF5] rounded-lg">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                                {
                                    details.map((detail, id) =>
                                        <div key={id} className="grid gap-1">
                                            <span className="text-grey-dark-3 text-sm">{detail?.label}</span>
                                            <p className="text-grey-dark-1 text-sm line-clamp-2 capitalize">{detail?.value}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid gap-4">
                            {
                                oem?.model_data.map((model) =>
                                    <div key={model?._id} className="flex items-center gap-12 border border-input-filled py-4 px-5 rounded-lg">
                                        <div className="w-full max-w-40 rounded-lg overflow-hidden">
                                            <img src={model?.avatar || vehicleImg} alt="vehicle" className="md:w-auto w-56 object-cover" />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between">
                                            <div className="grid grid-cols-2 gap-5">
                                                <div className="grid gap-1">
                                                    <span className="text-grey-dark-3 text-sm">Model</span>
                                                    <p className="text-grey-dark-1 text-sm line-clamp-2 capitalize">{model?.model}</p>
                                                </div>
                                                <div className="grid gap-1">
                                                    <span className="text-grey-dark-3 text-sm">Year</span>
                                                    <p className="text-grey-dark-1 text-sm line-clamp-2 capitalize">{model?.year}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" theme="danger" onClick={() => toggleDeleteModel(model?._id)}>
                                                    <Icon icon="lucide:trash-2" className="size-5" />
                                                </Button>
                                                <Button type="button" theme="tertiary" onClick={() => toggleEditModel(model)}>
                                                    <Icon icon="lucide:pencil" className="size-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </motion.div>
                <EditOEMModal isOpen={toggleModals.openEditOemModal} oem={oem!} close={toggleEditOem} />
                <DeleteModelModal isOpen={toggleModals.openDeleteModelModal} oem={oem!} modelId={toggleModals.modelId} close={() => toggleDeleteModel("")} />
                <DeleteOEMModal isOpen={toggleModals.openDeleteOemModal} oem={oem!} close={toggleDeleteOem} />
                <CreateModelModal isOpen={toggleModals.openCreateModel} close={() => toggleCreateModel("")} modelId={toggleModals.modelId} model={toggleModals.model} oemId={oem?.oem_id as string} />
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}