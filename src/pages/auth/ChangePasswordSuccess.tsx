import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/core";
import successLogo from "@/assets/verified_mark_3d.gif";
import { routeVariants } from "@/constants/animateVariants";
import { useNavigate } from "react-router-dom";

export const ChangePasswordSuccessPage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-8 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <div className="grid gap-1 content-start">
                <img src={successLogo} alt="success_logo" width={122} height={122} className="mx-auto" />
                <div className="grid gap-1 justify-items-center">
                    <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Good Job</h1>
                    <p className="font-normal text-sm text-grey-dark-2 text-center">You have successfully changed your password, Kindly Sign in to your account.</p>
                </div>
            </div>
            
            <Button type="button" theme="primary" block onClick={() => navigate("/auth/forgot-password")}>Sign in with New Password</Button>
        </motion.div>
    )
}