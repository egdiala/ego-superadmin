import { Routes, Route } from "react-router-dom";
import { LeaseReceivablesPage, ReceivablesPage, StaffCommuteReceivablesPage, ViewLeaseReceivablesPage, ViewStaffCommuteReceivablesPage, ViewStaffCommuteReceivablesTripsPage } from "@/pages/receivables";

const ReceivablesRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ReceivablesPage />} >
                <Route path="lease" element={<LeaseReceivablesPage />} />
                <Route path="staff-commute" element={<StaffCommuteReceivablesPage />} />
            </Route>
            <Route path="lease/:id" element={<ViewLeaseReceivablesPage />} />
            <Route path="staff-commute/:id" element={<ViewStaffCommuteReceivablesPage />} />
            <Route path="staff-commute/:id/:orgId" element={<ViewStaffCommuteReceivablesTripsPage />} />
        </Routes>
    );
};

export default ReceivablesRoutes;