import { ReactNode } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { ProfilePage } from "@/pages/profile";
import { AnimatePresence } from "framer-motion";
// import { InvoicesPage } from "@/pages/invoices";
import { ActivityLogPage } from "@/pages/activity-log";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { NotificationsPage } from "@/pages/notifications";
import { AccountsLayout } from "@/pages/accounts/Accounts";
import { AccountsPage, RolesPage } from "@/pages/accounts";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthRoutes, ChargeStationsRoutes, CustomersRoutes, DashboardRoutes, DriversRoutes, ExpectedRevenueRoutes, FeesRoutes, PaymentLogRoutes, ReceivablesRoutes, RevenueSplitRoutes, RidersRoutes, RolesRoutes, ServiceRequestsRoutes, TripsRoutes, VehiclesRoutes, WalletRoutes } from "./modules";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<ProtectedLayout><LocationProvider><DashboardRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
                <Route path="activity-log" element={<ProtectedLayout><LocationProvider><ActivityLogPage /></LocationProvider></ProtectedLayout>} />
                <Route path="/drivers/:id/*" element={<ProtectedLayout><LocationProvider><DriversRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="/accounts/*" element={<ProtectedLayout><LocationProvider><AccountsLayout /></LocationProvider></ProtectedLayout>}>
                    <Route index path="admins" element={<AccountsPage />} />
                    <Route path="roles" element={<RolesPage />} />
                </Route>
                <Route path="/accounts/roles/*" element={<ProtectedLayout><LocationProvider><RolesRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="/profile" element={<ProtectedLayout><LocationProvider><ProfilePage /></LocationProvider></ProtectedLayout>} />
                <Route path="customers/*" element={<ProtectedLayout><LocationProvider><CustomersRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="vehicles/*" element={<ProtectedLayout><LocationProvider><VehiclesRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="riders/*" element={<ProtectedLayout><LocationProvider><RidersRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="charge-stations/*" element={<ProtectedLayout><LocationProvider><ChargeStationsRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="trips/*" element={<ProtectedLayout><LocationProvider><TripsRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="wallet/*" element={<ProtectedLayout><LocationProvider><WalletRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="notifications" element={<ProtectedLayout><LocationProvider><NotificationsPage /></LocationProvider></ProtectedLayout>} />
                {/* <Route path="invoices" element={<ProtectedLayout><LocationProvider><InvoicesPage /></LocationProvider></ProtectedLayout>} /> */}
                <Route path="payment-log/*" element={<ProtectedLayout><LocationProvider><PaymentLogRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="receivables/*" element={<ProtectedLayout><LocationProvider><ReceivablesRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="revenue/*" element={<ProtectedLayout><LocationProvider><ExpectedRevenueRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="revenue-split/*" element={<ProtectedLayout><LocationProvider><RevenueSplitRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="fees/*" element={<ProtectedLayout><LocationProvider><FeesRoutes /></LocationProvider></ProtectedLayout>} />
                <Route path="service-request/*" element={<ProtectedLayout><LocationProvider><ServiceRequestsRoutes /></LocationProvider></ProtectedLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;