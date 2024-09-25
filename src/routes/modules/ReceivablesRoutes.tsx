import { Routes, Route } from "react-router-dom";
import { LeaseReceivablesPage, ReceivablesPage, StaffCommuteReceivablesPage, ViewLeaseReceivablesPage } from "@/pages/receivables";

const ReceivablesRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ReceivablesPage />} >
                <Route path="lease" element={<LeaseReceivablesPage />} />
                <Route path="staff-commute" element={<StaffCommuteReceivablesPage />} />
            </Route>
            <Route path="lease/:id" element={<ViewLeaseReceivablesPage />} />
        </Routes>
    );
};

export default ReceivablesRoutes;