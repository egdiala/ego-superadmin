import React from "react";
import questionMark from "@/assets/question_mark.gif";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { removeItem } from "@/utils/localStorage";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";

interface LogOutModalProps {
    isOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    close: (value: boolean) => void
}

export const LogOutModal: React.FC<LogOutModalProps> = ({ isOpen, close }) => {
    const navigate = useNavigate()
    const logOut = () => {
        removeItem(APP_TOKEN_STORAGE_KEY);
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login");
    }
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen bg-grey-dark-4/70">
            <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
                <DialogPanel transition className="flex flex-col gap-4 justify-between w-full md:max-w-[21.875rem] rounded-lg bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full data-[closed]:opacity-0">
                    <img src={questionMark} alt="caution" className="size-12" />
                    <div className="grid gap-1">
                        <DialogTitle as="h1" className="text-xl font-bold text-grey-dark-1">
                            Log out of eGO?
                        </DialogTitle>
                        <p className="text-grey-dark-2 text-sm">This action will log you out and , you will need to sign in again to gain access</p>
                    </div>
                    <div className="flex items-center w-full gap-2 md:gap-4">
                        <Button type="button" theme="tertiary" onClick={() => close(false)} block>Cancel</Button>
                        <Button type="submit" theme="primary" onClick={() => logOut()} block>Logout</Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}