import { ReactNode } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { AnimatePresence } from "framer-motion";
import { AuthRoutes, DashboardRoutes, DriversRoutes } from "./modules";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { Routes, Route, BrowserRouter } from "react-router-dom";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<ProtectedLayout><LocationProvider><DashboardRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
                <Route path="/drivers/:id/*" element={<ProtectedLayout><LocationProvider><DriversRoutes /></LocationProvider></ProtectedLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;