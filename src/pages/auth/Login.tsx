import React, { Fragment, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import successLogo from "@/assets/verified_mark_3d.gif";
import { AnimatePresence, motion } from "framer-motion";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { routeVariants } from "@/constants/animateVariants";
import { Button, Input, PasswordInput } from "@/components/core";
import { useLogin, useSetPassword } from "@/services/hooks/mutations";
import { changePasswordSchema, loginSchema } from "@/validations/auth";

export const LoginPage: React.FC = () => {
    const [state, setState] = useState("login")
    const { mutate: login, isPending: isLoggingIn } = useLogin((v) => {
        if (v?.status === "reset-pass") {
            setState("change-password")
        }
    })
    const { mutate: changePassword, isPending: isChangingPassword } = useSetPassword((v) => {
        if (v?.status === "ok") {
            setState("ok")
        }
    })

    const { handleSubmit, isValid, register, values: loginValues } = useFormikWrapper({
        validateOnMount: true,
        validationSchema: loginSchema,
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit(values) {
            login(values)
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
            changePassword({ email: loginValues.email, old_password: loginValues.password, new_password: values.new_password })
        }
    })

    const backToLogin = useCallback(() => {
        setState("login")
    },[])
    return (
        <Fragment>
        {/* Login Component */}
        <AnimatePresence mode="popLayout">
            {
                state === "login" && (
                <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-7 lg:pt-8 lg:px-12 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
                    <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
                    <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Sign in</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                        <div className="grid gap-6 pb-6">
                            <Input id="email" label="Email" type="text" placeholder="example@email.com" {...register("email")} />
                            <PasswordInput id="password" label="Password" placeholder="•••••••••" {...register("password")} showPassword />
                        </div>
                        <Button type="submit" theme="primary" loading={isLoggingIn} disabled={isLoggingIn || !isValid} block>Sign In</Button>
                        <Link to="/auth/forgot-password" className="text-center text-dark-green-1 underline underline-offset-2 decoration-dark-green-1 text-base font-semibold">Reset Password</Link>
                    </form>
                </motion.div>
                )
            }
        </AnimatePresence>
        {/* Change Password Component */}
        <AnimatePresence mode="popLayout">
            {
                state === "change-password" && (
                <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
                    <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
                    <div className="grid gap-1 justify-items-center">
                        <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Change your password</h1>
                        <p className="font-normal text-sm text-grey-dark-2 text-center">Please change your default password to a new one.</p>
                    </div>
                    
                    <form onSubmit={changePasswordFormik.handleSubmit} className="flex flex-col gap-7">
                        <div className="grid gap-6">
                            <PasswordInput id="new_password" label="New Password" placeholder="•••••••••" {...changePasswordFormik.register("new_password")} showPassword />
                            <PasswordInput id="confirm_password" label="Confirm New Password" placeholder="•••••••••" {...changePasswordFormik.register("confirm_password")} showPassword />
                        </div>
                        <Button type="submit" theme="primary" loading={isChangingPassword} disabled={isChangingPassword || !changePasswordFormik.isValid} block>Change Password</Button>
                    </form>
                </motion.div>
                )
            }
        </AnimatePresence>
        {/* Change Password Success Component */}
        <AnimatePresence mode="popLayout">
            {
                state === "ok" && (
                <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-8 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
                    <div className="grid gap-1 content-start">
                        <img src={successLogo} alt="success_logo" width={122} height={122} className="mx-auto" />
                        <div className="grid gap-1 justify-items-center">
                            <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Good Job</h1>
                            <p className="font-normal text-sm text-grey-dark-2 text-center">You have successfully changed your password, Kindly Sign in to your account.</p>
                        </div>
                    </div>
                    <Button type="button" theme="primary" block onClick={backToLogin}>Sign in with New Password</Button>
                </motion.div>
                )
            }
        </AnimatePresence>
        </Fragment>
    )
}