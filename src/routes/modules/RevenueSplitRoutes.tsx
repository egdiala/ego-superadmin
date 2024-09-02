import { Routes, Route } from "react-router-dom";
import { RevenueSplitEHailingPage, RevenueSplitLeasePage, RevenueSplitPage, RevenueSplitStaffCommutePage } from "@/pages/revenue-split";

const RevenueSplitRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<RevenueSplitPage />} >
                <Route path="e-hailing" element={<RevenueSplitEHailingPage />} />
                <Route path="lease" element={<RevenueSplitLeasePage />} />
                <Route path="staff-commute" element={<RevenueSplitStaffCommutePage />} />
            </Route>
        </Routes>
    );
};

export default RevenueSplitRoutes;