import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import successLogo from "@/assets/verified_mark_3d.gif";
import { AnimatePresence, motion } from "framer-motion";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { routeVariants } from "@/constants/animateVariants";
import { getItem, removeItem, setItem } from "@/utils/localStorage";
import { changePasswordSchema, loginSchema } from "@/validations/auth";
import { Button, Input, OtpInput, PasswordInput } from "@/components/core";
import { useConfirmResetPasswordOTP, useLogin, useSendResetPasswordOTP, useSetPassword } from "@/services/hooks/mutations";

export const LoginPage: React.FC = () => {
    const [state, setState] = useState("login")
    const [otp, setOtp] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(120);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const otp_request_id = getItem<string>("otp_request_id")
    
    const { mutate: login, isPending: isLoggingIn } = useLogin((v) => {
        if (v?.otp_request_id) {
            setItem("otp_request_id", v?.otp_request_id)
            sendOTP({ otp_request_id: v?.otp_request_id })
        }
    })
    const { mutate: changePassword, isPending: isChangingPassword } = useSetPassword((v) => {
        if (v?.status === "ok") {
            setState("ok")
        }
    })

    const { mutate: confirmOTP, isPending: isConfirming } = useConfirmResetPasswordOTP(() => {
        setState("change-password")
    })

    const { mutate: sendOTP, isPending: isSendingOTP } = useSendResetPasswordOTP(() => setState("verify-otp"))

    useEffect(() => {
        let interval: any;
        if (isButtonDisabled) {
          interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        }

        if (state !== "verify-otp") {
            return () => clearInterval(interval)
        }
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [isButtonDisabled, state]);
    
    useEffect(() => {
        if (countdown <= 0) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          setCountdown(60); // Reset countdown (optional if button is not disabled again)
        }
    }, [countdown]);

    const handleResendClick = () => {
        sendOTP({ otp_request_id });
        setIsButtonDisabled(true);
        setCountdown(60); // Reset the timer
    };

    const formatCountdown = (countdown: number) => {
        const minutes = Math.floor(countdown / 60).toString().padStart(2, "0");
        const seconds = (countdown % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };


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
            changePassword({ otp, new_password: values.new_password, otp_request_id })
        }
    })

    const backToLogin = useCallback(() => {
        removeItem("otp_request_id")
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
        {/* Verify OTP Component */}
        <AnimatePresence mode="popLayout">
            {
                state === "verify-otp" && (
                <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
                    <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
                    <div className="grid gap-2 justify-items-center">
                        <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Verify Your Email</h1>
                        <p className="font-normal text-sm text-grey-dark-2 text-center">
                            Enter the 4 - digit code sent to {loginValues.email} <br />
                            <button type="button" className="text-green-1 text-base font-bold decoration-green-1 underline underline-offset-2" onClick={backToLogin}>Edit Email Address</button>
                        </p>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="grid gap-7 justify-items-center">
                            <OtpInput value={otp} onChange={(v: any) => setOtp(v)} />
                            <div className="flex items-center justify-center text-grey-0 text-base">
                                Didn’t receive a code? { isButtonDisabled ? <>Resend in <span className="font-bold text-green-1">&nbsp;{formatCountdown(countdown)}</span></> : <button type="button" className="font-bold text-green-1 disabled:cursor-not-allowed" disabled={isButtonDisabled || isConfirming || isSendingOTP} onClick={handleResendClick}>&nbsp;Resend Now</button> }
                            </div>
                        </div>
                        <Button type="button" theme="primary" loading={isConfirming} disabled={isConfirming} block onClick={() => confirmOTP({ otp_request_id, otp })}>Reset Password</Button>
                    </div>
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
                            <p className="font-normal text-sm text-grey-dark-2 text-center">You have successfully changed your password. Kindly sign in to your account.</p>
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