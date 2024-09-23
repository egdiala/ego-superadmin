import { Routes, Route } from "react-router-dom";
import { LeaseReceivablesPage, ReceivablesPage, StaffCommuteReceivablesPage, ViewReceivablesPage } from "@/pages/receivables";

const ReceivablesRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ReceivablesPage />} >
                <Route path="lease" element={<LeaseReceivablesPage />} />
                <Route path="staff-commute" element={<StaffCommuteReceivablesPage />} />
            </Route>
            <Route path=":id" element={<ViewReceivablesPage />} />
        </Routes>
    );
};

export default ReceivablesRoutes;