import { Sidebar } from "@/components/core/Sidebar";
import type { PropsWithChildren } from "react";

const ProtectedLayout = ({ children }: PropsWithChildren) => {
  
    return (
        <div className="relative isolate flex min-h-svh w-full overflow-hidden">
            <Sidebar />
            <div className="pl-4 lg:pl-64 pr-4 py-6 lg:py-8 flex-1">{children}</div>
        </div>
    );
};

export default ProtectedLayout;