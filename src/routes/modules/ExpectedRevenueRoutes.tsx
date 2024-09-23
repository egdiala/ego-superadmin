import { Routes, Route } from "react-router-dom";
import { ExpectedRevenuePage, LeaseExpectedRevenuePage, StaffCommuteExpectedRevenuePage } from "@/pages/expected-revenue";

const ExpectedRevenueRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ExpectedRevenuePage />} >
                <Route path="lease" element={<LeaseExpectedRevenuePage />} />
                <Route path="staff-commute" element={<StaffCommuteExpectedRevenuePage />} />
            </Route>
        </Routes>
    );
};

export default ExpectedRevenueRoutes;