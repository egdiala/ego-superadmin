import { type ReactNode } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { ProfilePage } from "@/pages/profile";
import { AnimatePresence } from "framer-motion";
// import { InvoicesPage } from "@/pages/invoices";
import { ActivityLogPage } from "@/pages/activity-log";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { NotificationsPage } from "@/pages/notifications";
import { AccountsLayout } from "@/pages/accounts/Accounts";
import { AccountsPage, RolesPage } from "@/pages/accounts";
import { ReconciliationPage } from "@/pages/reconciliation";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthRoutes, ChargeStationsRoutes, CustomersRoutes, DashboardRoutes, DisbursementRoutes, DriversRoutes, ExpectedRevenueRoutes, FeesRoutes, OEMsRoutes, PaymentLogRoutes, ReceivablesRoutes, RevenueSplitRoutes, RidersRoutes, RolesRoutes, ServiceRequestsRoutes, TripsRoutes, VehiclesRoutes, WalletRoutes } from "./modules";
import { BanksPage } from "@/pages/banks";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
                <Route
                    path="/*"
                    element={
                        <ProtectedLayout requiredPermissions={[""]}>
                            <LocationProvider>
                                <DashboardRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="activity-log"
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_ACTIVITY_LOG"]}>
                            <LocationProvider>
                                <ActivityLogPage />
                            </LocationProvider>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="bank-accounts"
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_BANK_INFO"]}>
                            <LocationProvider>
                                <BanksPage />
                            </LocationProvider>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="drivers/*"
                    element={
                        <ProtectedLayout requiredPermissions={["DRIVER_DATA"]}>
                            <LocationProvider>
                                <DriversRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/accounts/*"
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_ADMIN_ACCOUNT", "SETUP_ADMIN_ROLE"]}>
                            <LocationProvider>
                                <AccountsLayout />
                            </LocationProvider>
                        </ProtectedLayout>
                    }
                >
                    <Route index path="admins" element={<AccountsPage />} />
                    <Route path="roles" element={<RolesPage />} />
                </Route>
                <Route 
                    path="/disbursement/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["FINANCE_DISBURSEMENT"]}>
                            <LocationProvider>
                                <DisbursementRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="/reconciliation" 
                    element={
                        <ProtectedLayout requiredPermissions={["FINANCE_RECONCILIATION"]}>
                            <LocationProvider>
                                <ReconciliationPage />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="/accounts/roles/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_ADMIN_ROLE"]}>
                            <LocationProvider>
                                <RolesRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedLayout requiredPermissions={["PROFILE"]}>
                            <LocationProvider>
                                <ProfilePage />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="customers/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["CUSTOMER_DATA"]}>
                            <LocationProvider>
                                <CustomersRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="vehicles/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["VEHICLE_DATA"]}>
                            <LocationProvider>
                                <VehiclesRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="riders/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["RIDER_DATA"]}>
                            <LocationProvider>
                                <RidersRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="charge-stations/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_CHARGE_STATION"]}>
                            <LocationProvider>
                                <ChargeStationsRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="trips/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["TRIP_DATA"]}>
                            <LocationProvider>
                                <TripsRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="wallet/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["FINANCE_WALLET"]}>
                            <LocationProvider>
                                <WalletRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="notifications" 
                    element={
                        <ProtectedLayout requiredPermissions={["NOTIFICATION_DATA"]}>
                            <LocationProvider>
                                <NotificationsPage />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="oem/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_OEMS"]}>
                            <LocationProvider>
                                <OEMsRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="payment-log/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["FINANCE_PAYMENT_LOG"]}>
                            <LocationProvider>
                                <PaymentLogRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="receivables/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["FINANCE_RECEIVEABLE"]}>
                            <LocationProvider>
                                <ReceivablesRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="revenue/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["FINANCE_EXP_REVENUE"]}>
                            <LocationProvider>
                                <ExpectedRevenueRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="revenue-split/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_REV_SPLIT"]}>
                            <LocationProvider>
                                <RevenueSplitRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="fees/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["SETUP_FEE_FEE"]}>
                            <LocationProvider>
                                <FeesRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
                <Route 
                    path="service-request/*" 
                    element={
                        <ProtectedLayout requiredPermissions={["SERVICE_REQUEST"]}>
                            <LocationProvider>
                                <ServiceRequestsRoutes />
                            </LocationProvider>
                        </ProtectedLayout>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;