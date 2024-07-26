import { ReactNode } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { AnimatePresence } from "framer-motion";
import { AuthRoutes, DashboardRoutes, DriversRoutes, RolesRoutes } from "./modules";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AccountsLayout } from "@/pages/accounts/Accounts";
import { AccountsPage, RolesPage } from "@/pages/accounts";
import { ProfilePage } from "@/pages/profile";


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
                <Route path="/accounts/*" element={<ProtectedLayout><LocationProvider><AccountsLayout /></LocationProvider></ProtectedLayout>}>
                    <Route index path="admins" element={<AccountsPage />} />
                    <Route path="roles" element={<RolesPage />} />
                </Route>
                <Route path="/accounts/roles/*" element={<ProtectedLayout><LocationProvider><RolesRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="/profile" element={<ProtectedLayout><LocationProvider><ProfilePage /></LocationProvider></ProtectedLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;