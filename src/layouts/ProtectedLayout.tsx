import { Sidebar } from "@/components/core/Sidebar";
import { useCheckPermission } from "@/hooks/useCheckPermission";
import { getAdminData, isAuthenticated } from "@/utils/authUtil";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();
    const adminData = getAdminData()
    const { pathname } = useLocation()
    const [showSidebar, setShowSidebar] = useState(false)
    const { hasPermission, firstRoute } = useCheckPermission();
    
    useEffect(() => {
        if (showSidebar) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    },[showSidebar])

    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }

    if (!hasPermission) {
        return <Navigate to={firstRoute?.to as string} replace />;
    }
    
    if (hasPermission && pathname === "/" && adminData?.user_type !== "superadmin") {
        return <Navigate to={firstRoute?.to as string} replace />;
    }

  
    return (
        <div className="relative isolate flex min-h-dvh w-full overflow-hidden">
            <Sidebar showSidebar={showSidebar} />
            <div className="relative h-full flex-1">
                <header className="flex sticky top-0 left-0 right-0 lg:hidden bg-white border-b p-4">
                    <button type="button" onClick={() => setShowSidebar(!showSidebar)}>
                        <Icon icon="solar:hamburger-menu-linear" className="text-grey-dark-2 size-5" />
                    </button>
                </header>
                <main className="pl-4 lg:pl-64 pr-4 py-6 lg:py-8 flex-1 overflow-hidden">
                    {children}
                    <AnimatePresence mode="wait">
                        {
                            showSidebar && (
                                <motion.div initial={{ display: "none", opacity: 0 }} animate={{ display: "grid", position: "fixed", opacity: 1 }} exit={{ display: "none", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5 }} className="overflow-hidden bg-grey-dark-1/10 top-0 left-0 right-0 bottom-0 inset-0 z-10" onClick={() => setShowSidebar(!showSidebar)} />
                            )
                        }
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default ProtectedLayout;