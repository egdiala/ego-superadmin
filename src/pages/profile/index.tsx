import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Button, TableAction } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { EditProfileModal, LogOutModal, ResetPasswordModal } from "@/components/pages/profile";

export const ProfilePage: React.FC = () => {
    const [toggleModals, setToggleModals] = useState({
        openEditProfileModal: false,
        openResetPasswordModal: false,
        openLogOutModal: false,
    })

    const gridItems = [
        { label: "First Name", value: "Janet" },
        { label: "Last Name", value: "Babalola" },
        { label: "Email", value: "example@gmail.com" },
        { label: "Phone Number", value: "0814 5632 783" },
        { label: "Role", value: "Support" }
    ]
  
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
                <h2 className="font-bold text-xl text-grey-dark-1">Janet Babalola</h2>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <TableAction type="button" theme="grey" onClick={toggleEditProfile} block>
                      <Icon icon="lucide:pencil" className="size-4" />
                      Edit Profile
                    </TableAction>
                    <TableAction type="button" theme="secondary" onClick={toggleResetPassword} block>
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
            <div className="flex flex-col md:flex-row md:items-start gap-10 bg-green-4 p-4 rounded-lg">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="size-32 rounded-2xl object-cover" alt="user" />
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-y-8">
                    {
                        gridItems.map((item) =>
                        <div key={item.label} className="grid gap-1">
                            <h4 className="text-grey-dark-3 text-sm">{item.label}</h4>
                            <span className="text-grey-dark-1 text-sm">{item.value}</span>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
        <EditProfileModal isOpen={toggleModals.openEditProfileModal} close={toggleEditProfile} />
        <LogOutModal isOpen={toggleModals.openLogOutModal} close={toggleLogOut} />
        <ResetPasswordModal isOpen={toggleModals.openResetPasswordModal} close={toggleResetPassword} />
      </motion.div>
    )
}