import React from "react";
import { motion } from "framer-motion";
import { Button, PasswordInput } from "@/components/core";
import { routeVariants } from "@/constants/animateVariants";
import { useNavigate } from "react-router-dom";

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
            <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Enter New Password</h1>
            <form className="flex flex-col gap-7">
                <div className="grid gap-6">
                    <PasswordInput label="New Password" type="password" name="new_password" placeholder="•••••••••" showPassword />
                    <PasswordInput label="Confirmed Password" type="password" name="confirm_password" placeholder="•••••••••" showPassword />
                </div>
                <Button type="button" theme="primary" block onClick={() => navigate("/auth/login")}>Update Password</Button>
            </form>
        </motion.div>
    )
}