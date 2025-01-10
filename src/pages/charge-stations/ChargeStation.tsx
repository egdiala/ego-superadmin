import React, { Fragment, useCallback, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import chargingCar from "@/assets/charging_car.svg"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { useGetChargeStation } from "@/services/hooks/queries"
import { Breadcrumb, Button, RenderIf } from "@/components/core"
import { DeleteStationModal, EditStationModal } from "@/components/pages/charge-stations"
import { hasPermission, RenderFeature } from "@/hooks/usePermissions"

export const ViewChargeStation: React.FC = () => {
    const params = useParams()
    const { data: station, isFetching } = useGetChargeStation(params?.id as string)

    const [toggleModals, setToggleModals] = useState({
        openDeleteStationModal: false,
        openEditStationModal: false,
    })
  
    const toggleDeleteStation = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteStationModal: !toggleModals.openDeleteStationModal,
      }))
    },[toggleModals.openDeleteStationModal])
  
    const toggleEditStation = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openEditStationModal: !toggleModals.openEditStationModal,
      }))
    }, [toggleModals.openEditStationModal])

    const details = useMemo(() => {
        return [
            { label: "Name", value: station?.station_name },
            { label: "Phone Number", value: station?.contact_number },
            { label: "Opening Hours", value: `${station?.opening_time} - ${station?.closing_time}` },
            { label: "Address", value: station?.full_address },
            { label: "Address LGA", value: station?.lga_address },
        ]
    },[station?.closing_time, station?.contact_number, station?.full_address, station?.lga_address, station?.opening_time, station?.station_name])
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
                    <Breadcrumb items={[{ label: "Charge Stations", link: "/charge-stations" }, { label: station?.station_name as string, link: `/charge-stations/${params?.id as string}` }]} showBack />
                    <div className="grid content-start gap-4 p-4 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-xl text-grey-dark-1 capitalize">{station?.station_name}</h1>
                            <RenderIf condition={(hasPermission("SETUP_CHARGE_STATION", "update") || hasPermission("SETUP_CHARGE_STATION", "delete"))}>
                                <div className="flex items-center gap-2">
                                    <RenderFeature module="SETUP_CHARGE_STATION" permission="delete">
                                        <Button type="button" theme="danger" onClick={toggleDeleteStation}>
                                            <Icon icon="lucide:trash-2" className="size-5" />
                                            Delete Station
                                        </Button>
                                    </RenderFeature>
                                    <RenderFeature module="SETUP_CHARGE_STATION" permission="update">
                                        <Button type="button" theme="tertiary" onClick={toggleEditStation}>
                                            <Icon icon="lucide:pencil" className="size-5" />
                                            Edit Station
                                        </Button>
                                    </RenderFeature>
                                </div>
                            </RenderIf>
                        </div>
                        <div className="flex items-center gap-10 py-4 px-5 bg-[#F6FBF5] rounded-lg">
                            <img src={chargingCar} alt="charging_Car" className="w-auto" />
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
                    </div>
                </motion.div>
                <RenderFeature module="SETUP_CHARGE_STATION" permission="delete">
                    <DeleteStationModal isOpen={toggleModals.openDeleteStationModal} station={station!} close={toggleDeleteStation} />
                </RenderFeature>
                <RenderFeature module="SETUP_CHARGE_STATION" permission="update">
                    <EditStationModal isOpen={toggleModals.openEditStationModal} station={station!} close={toggleEditStation} />
                </RenderFeature>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-dvh items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </Fragment>
    )
}