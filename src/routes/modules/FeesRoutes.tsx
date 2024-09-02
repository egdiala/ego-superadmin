import { Routes, Route } from "react-router-dom";
import { FeesEHailingPage, FeesLeasePage, FeesPage, FeesStaffCommutePage } from "@/pages/fees";

const FeesRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<FeesPage />} >
                <Route path="e-hailing" element={<FeesEHailingPage />} />
                <Route path="lease" element={<FeesLeasePage />} />
                <Route path="staff-commute" element={<FeesStaffCommutePage />} />
            </Route>
        </Routes>
    );
};

export default FeesRoutes;