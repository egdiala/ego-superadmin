import { Sidebar } from "@/components/core/Sidebar";
import { useCheckPermission } from "@/hooks/useCheckPermission";
import { getAdminData, isAuthenticated } from "@/utils/authUtil";
import { type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();
    const adminData = getAdminData()
    const { pathname } = useLocation()
    const { hasPermission, firstRoute } = useCheckPermission();

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
        <div className="relative isolate flex min-h-svh w-full overflow-hidden">
            <Sidebar />
            <main className="pl-4 lg:pl-64 pr-4 py-6 lg:py-8 flex-1">{children}</main>
        </div>
    );
};

export default ProtectedLayout;