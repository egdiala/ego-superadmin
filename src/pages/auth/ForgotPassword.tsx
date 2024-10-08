import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@/components/core";
import { forgotPasswordSchema } from "@/validations/auth";
import { routeVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useSendResetPasswordEmail, useSendResetPasswordOTP } from "@/services/hooks/mutations";
import { setItem } from "@/utils/localStorage";

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const { mutate: sendOTP, isPending: isSendingOTP } = useSendResetPasswordOTP((v) => {
        if (v?.status === "ok") {
            navigate("/auth/verify-email")
        }
    })
    const { mutate: sendEmail, isPending: isSendingEmail } = useSendResetPasswordEmail((v) => {
        if (v?.status === "ok" && v?.data?.otp_request_id) {
            setItem("otp_request_id", v?.data?.otp_request_id)
            setItem("reset_password_email", forgotPasswordValues?.email)
            sendOTP({ otp_request_id: v?.data?.otp_request_id })
        }
    })

    const { handleSubmit, isValid, register, values: forgotPasswordValues } = useFormikWrapper({
        validateOnMount: true,
        validationSchema: forgotPasswordSchema,
        initialValues: {
            email: ""
        },
        onSubmit(values) {
            sendEmail(values)
        }
    })

    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <img src="/CZ_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
            <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <Input label="Email" type="text" placeholder="example@email.com" {...register("email")} />
                <Button type="submit" theme="primary" block loading={isSendingEmail || isSendingOTP} disabled={isSendingEmail || isSendingOTP || !isValid}>Verify Email</Button>
                <Link to="/auth/login" className="text-center text-dark-green-1 text-base font-semibold">Sign in instead</Link>
            </form>
        </motion.div>
    )
}