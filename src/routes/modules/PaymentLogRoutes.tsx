import { Routes, Route } from "react-router-dom";
import { LeasePaymentLogPage, PaymentLogPage, StaffCommutePaymentLogPage, ViewStaffCommutePaymentsPage } from "@/pages/payments";

const PaymentLogRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<PaymentLogPage />} >
                <Route path="lease" element={<LeasePaymentLogPage />} />
                <Route path="staff-commute" element={<StaffCommutePaymentLogPage />} />
            </Route>
            <Route path="staff-commute/:id" element={<ViewStaffCommutePaymentsPage />} />
        </Routes>
    );
};

export default PaymentLogRoutes;