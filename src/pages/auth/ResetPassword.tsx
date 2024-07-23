import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "@/validations/auth";
import { Button, PasswordInput } from "@/components/core";
import { getItem, removeItem } from "@/utils/localStorage";
import { routeVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useSetPassword } from "@/services/hooks/mutations";

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const otp = getItem<string>("otp")
    const otp_request_id = getItem<string>("otp_request_id")
    const { mutate: changePassword, isPending: isChangingPassword } = useSetPassword((v) => {
        if (v?.status === "ok") {
            removeItem("otp")
            removeItem("otp_request_id")
            navigate("/auth/login")
        }
    })

    const changePasswordFormik = useFormikWrapper({
        validateOnMount: true,
        validationSchema: changePasswordSchema,
        initialValues: {
            new_password: "",
            confirm_password: ""
        },
        onSubmit(values) {
            changePassword({ otp, new_password: values.new_password, otp_request_id })
        }
    })
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
            <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Enter New Password</h1>
            <form onSubmit={changePasswordFormik.handleSubmit} className="flex flex-col gap-7">
                <div className="grid gap-6">
                    <PasswordInput id="new_password" label="New Password" placeholder="•••••••••" {...changePasswordFormik.register("new_password")} showPassword />
                    <PasswordInput id="confirm_password" label="Confirmed Password" placeholder="•••••••••" {...changePasswordFormik.register("confirm_password")} showPassword />
                </div>
                <Button type="submit" theme="primary" block loading={isChangingPassword} disabled={isChangingPassword || !changePasswordFormik.isValid}>Update Password</Button>
            </form>
        </motion.div>
    )
}