import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/components/core";
import { forgotPasswordSchema } from "@/validations/auth";
import { routeVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useSendResetPasswordEmail } from "@/services/hooks/mutations";

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const { mutate: sendEmail, isPending: isSendingEmail } = useSendResetPasswordEmail((v) => {
        if (v?.status === "ok") {
            navigate("/auth/verify-email")
        }
    })

    const { handleSubmit, isValid, register } = useFormikWrapper({
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
            <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
            <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <Input label="Email" type="text" placeholder="example@email.com" {...register("email")} />
                <Button type="submit" theme="primary" block loading={isSendingEmail} disabled={isSendingEmail || !isValid}>Verify Email</Button>
            </form>
        </motion.div>
    )
}