import React, { useCallback, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Button, RenderIf, TableAction } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { EditProfileModal, LogOutModal, ResetPasswordModal } from "@/components/pages/profile";
import { useGetAdminProfile } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";
import blankImg from "@/assets/blank.svg";

export const ProfilePage: React.FC = () => {
  const { data, isFetching } = useGetAdminProfile()
  const [toggleModals, setToggleModals] = useState({
    openEditProfileModal: false,
    openResetPasswordModal: false,
    openLogOutModal: false,
  })

  const gridItems = useMemo(() => {
    return [
      { label: "First Name", value: data?.first_name },
      { label: "Last Name", value: data?.last_name },
      { label: "Email", value: data?.email },
      { label: "Phone Number", value: data?.phone_number },
      { label: "Role", value: data?.user_type }
    ]
  },[data?.email, data?.first_name, data?.last_name, data?.phone_number, data?.user_type])

  const toggleEditProfile = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openEditProfileModal: !toggleModals.openEditProfileModal,
    }))
  }, [toggleModals.openEditProfileModal])

  const toggleResetPassword = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openResetPasswordModal: !toggleModals.openResetPasswordModal,
    }))
  }, [toggleModals.openResetPasswordModal])

  const toggleLogOut = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openLogOutModal: !toggleModals.openLogOutModal,
    }))
  }, [toggleModals.openLogOutModal])
    
  return (
    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-3.5">
      <h1 className="text-grey-dark-1 font-bold text-2xl md:text-[2rem]">Profile</h1>
      <div className="grid content-start gap-2 p-4 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-y-3 md:items-center justify-between pb-4">
          <h2 className="font-bold text-xl text-grey-dark-1">{data?.first_name} {data?.last_name}</h2>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <TableAction type="button" theme="grey" disabled={isFetching} onClick={toggleEditProfile} block>
                <Icon icon="lucide:pencil" className="size-4" />
                Edit Profile
              </TableAction>
              <TableAction type="button" theme="secondary" disabled={isFetching} onClick={toggleResetPassword} block>
                <Icon icon="lucide:lock-keyhole" className="size-4" />
                Reset Password
              </TableAction>
            </div>
            <div className="w-full sm:w-auto">
              <Button type="button" theme="primary" onClick={toggleLogOut} block>
                <Icon icon="lucide:log-out" className="size-4" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
        <RenderIf condition={!isFetching}>
          <div className="flex flex-col md:flex-row md:items-start gap-10 bg-green-4 p-4 rounded-lg">
            <img src={data?.avatar || blankImg} className="size-32 rounded-2xl object-cover" alt="user" />
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    gridItems.map((item) =>
                    <div key={item.label} className="grid gap-1">
                        <h4 className="text-grey-dark-3 text-sm">{item.label}</h4>
                        <span className="text-grey-dark-1 text-sm line-clamp-2 text-ellipsis">{item.value}</span>
                    </div>
                    )
                }
            </div>
          </div>
        </RenderIf>
      </div>
      <RenderIf condition={isFetching}>
        <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
      </RenderIf>
      <EditProfileModal user={data!} isOpen={toggleModals.openEditProfileModal} close={toggleEditProfile} />
      <LogOutModal isOpen={toggleModals.openLogOutModal} close={toggleLogOut} />
      <ResetPasswordModal id={data?.auth_id!} isOpen={toggleModals.openResetPasswordModal} close={toggleResetPassword} />
    </motion.div>
  )
}