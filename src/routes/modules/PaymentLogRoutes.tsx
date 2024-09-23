import { Routes, Route } from "react-router-dom";
import { LeasePaymentLogPage, PaymentLogPage, StaffCommutePaymentLogPage } from "@/pages/payments";

const PaymentLogRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<PaymentLogPage />} >
                <Route path="lease" element={<LeasePaymentLogPage />} />
                <Route path="staff-commute" element={<StaffCommutePaymentLogPage />} />
            </Route>
        </Routes>
    );
};

export default PaymentLogRoutes;