import { Sidebar } from "@/components/core/Sidebar";
import { isAuthenticated } from "@/utils/authUtil";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();

    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }
  
    return (
        <div className="relative isolate flex min-h-svh w-full overflow-hidden">
            <Sidebar />
            <div className="pl-4 lg:pl-64 pr-4 py-6 lg:py-8 flex-1">{children}</div>
        </div>
    );
};

export default ProtectedLayout;