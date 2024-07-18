import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { routeVariants } from "@/constants/animateVariants";
import { Button, Input, PasswordInput } from "@/components/core";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-7 lg:pt-8 lg:px-12 bg-white max-w-md w-full h-fit place-self-center rounded-xl">
            <h1 className="font-bold text-2xl md:text-[2rem] text-grey-dark-1 text-center">Sign in</h1>
            <form className="flex flex-col gap-7">
                <div className="grid gap-6 pb-6">
                    <Input label="Email" type="text" name="email" placeholder="example@email.com" />
                    <PasswordInput label="Password" type="password" name="password" placeholder="•••••••••" showPassword />
                </div>
                <Button type="button" theme="primary" block onClick={() => navigate("/auth/change-password")}>Sign In</Button>
                <Link to="/auth/forgot-password" className="text-center text-dark-green-1 underline underline-offset-2 decoration-dark-green-1 text-base font-semibold">Reset Password</Link>
            </form>
        </motion.div>
    )
}