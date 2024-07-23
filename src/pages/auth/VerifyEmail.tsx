import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, OtpInput } from "@/components/core";
import { Link, useNavigate } from "react-router-dom";
import { routeVariants } from "@/constants/animateVariants";
import { useConfirmResetPasswordOTP, useSendResetPasswordOTP } from "@/services/hooks/mutations";
import { getItem, removeItem, setItem } from "@/utils/localStorage";

export const VerifyEmailPage: React.FC = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(120);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const otp_request_id = getItem<string>("otp_request_id")
    const reset_password_email = getItem<string>("reset_password_email")

    const { mutate: confirmOTP, isPending: isConfirming } = useConfirmResetPasswordOTP((v) => {
        if (v?.status === "ok") {
            setItem("otp", otp)
            removeItem("reset_password_email")
            navigate("/auth/reset-password")
        }
    })
    const { mutate: sendOTP, isPending: isSendingOTP } = useSendResetPasswordOTP()

    useEffect(() => {
        let interval: any;
        if (isButtonDisabled) {
          interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        }
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [isButtonDisabled]);
    
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

    
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 p-7 lg:p-8 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <img src="/eGO_logo_green.svg" className="w-32 mx-auto" alt="eGO_green_logo" />
            <div className="grid gap-2 justify-items-center">
                <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Verify Your Email</h1>
                <p className="font-normal text-sm text-grey-dark-2 text-center">
                    Enter the 4 - digit code sent to {reset_password_email} <br />
                    <Link to="/auth/forgot-password" className="text-green-1 text-base font-bold decoration-green-1 underline underline-offset-2">Edit Email Address</Link>
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