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
import { hasPermission, RenderFeature } from "@/hooks/usePermissions"

export const ViewOEM: React.FC = () => {
    const params = useParams()
    const { data: oem, isFetching } = useGetOEM(params?.id as string)

    const [toggleModals, setToggleModals] = useState({
        openDeleteOemModal: false,
        openDeleteModelModal: false,
        openEditOemModal: false,
        openEditModelModal: false,
        openCreateModel: false,
        modelId: "",
        model: "" as unknown as FetchedOEMType["model_data"][0]
    })
  
    const toggleDeleteOem = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        model: "" as unknown as FetchedOEMType["model_data"][0],
        openDeleteOemModal: !toggleModals.openDeleteOemModal,
      }))
    }, [toggleModals.openDeleteOemModal])
    
    const toggleDeleteModel = useCallback((id: string) => {
      setToggleModals((prev) => ({
        ...prev,
        modelId: id,
        model: "" as unknown as FetchedOEMType["model_data"][0],
        openDeleteModelModal: !toggleModals.openDeleteModelModal,
      }))
    }, [toggleModals.openDeleteModelModal])
  
    const toggleEditOem = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        model: "" as unknown as FetchedOEMType["model_data"][0],
        openEditOemModal: !toggleModals.openEditOemModal,
      }))
    }, [toggleModals.openEditOemModal])

    const toggleCreateModel = useCallback((id: string) => {
      setToggleModals((prev) => ({
        ...prev,
        modelId: id,
        model: "" as unknown as FetchedOEMType["model_data"][0],
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
                            <RenderIf condition={(hasPermission("SETUP_OEMS", "update") || hasPermission("SETUP_OEMS", "delete") || hasPermission("SETUP_OEMS", "create"))}>
                                <div className="flex items-center gap-2">
                                    <RenderFeature module="SETUP_OEMS" permission="delete">
                                        <Button type="button" theme="danger" onClick={toggleDeleteOem}>
                                            <Icon icon="lucide:trash-2" className="size-5" />
                                            Delete OEM
                                        </Button>
                                    </RenderFeature>
                                    <RenderFeature module="SETUP_OEMS" permission="update">
                                        <Button type="button" theme="tertiary" onClick={toggleEditOem}>
                                            <Icon icon="lucide:pencil" className="size-5" />
                                            Edit OEM Name
                                        </Button>
                                    </RenderFeature>
                                    <RenderFeature module="SETUP_OEMS" permission="create">
                                        <Button type="button" theme="primary" onClick={() => toggleCreateModel("")} block>
                                            <Icon icon="ph:plus" className="size-4" />
                                            Add Model
                                        </Button>
                                    </RenderFeature>
                                </div>
                            </RenderIf>
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
                                            <RenderIf condition={(hasPermission("SETUP_OEMS", "update") || hasPermission("SETUP_OEMS", "delete"))}>
                                                <div className="flex items-center gap-2">
                                                    <RenderFeature module="SETUP_OEMS" permission="delete">
                                                        <Button type="button" theme="danger" onClick={() => toggleDeleteModel(model?._id)}>
                                                            <Icon icon="lucide:trash-2" className="size-5" />
                                                        </Button>
                                                    </RenderFeature>
                                                    <RenderFeature module="SETUP_OEMS" permission="update">
                                                        <Button type="button" theme="tertiary" onClick={() => toggleEditModel(model)}>
                                                            <Icon icon="lucide:pencil" className="size-5" />
                                                        </Button>
                                                    </RenderFeature>
                                                </div>
                                            </RenderIf>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </motion.div>
                <RenderFeature module="SETUP_OEMS" permission="update">
                    <EditOEMModal isOpen={toggleModals.openEditOemModal} oem={oem!} close={toggleEditOem} />
                </RenderFeature>
                <RenderFeature module="SETUP_OEMS" permission="delete">
                    <DeleteOEMModal isOpen={toggleModals.openDeleteOemModal} oem={oem!} close={toggleDeleteOem} />
                    <DeleteModelModal isOpen={toggleModals.openDeleteModelModal} oem={oem!} modelId={toggleModals.modelId} close={() => toggleDeleteModel("")} />
                </RenderFeature>
                <RenderFeature module="SETUP_OEMS" permission="create">
                    <CreateModelModal isOpen={toggleModals.openCreateModel} close={() => toggleCreateModel("")} modelId={toggleModals.modelId} model={toggleModals.model} oemId={oem?.oem_id as string} />
                </RenderFeature>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}