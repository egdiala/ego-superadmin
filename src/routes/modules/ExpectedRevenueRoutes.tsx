import { Routes, Route } from "react-router-dom";
import { ExpectedRevenuePage, LeaseExpectedRevenuePage, StaffCommuteExpectedRevenuePage, ViewLeaseExpectedRevenuePage, ViewStaffCommuteExpectedRevenuePage } from "@/pages/expected-revenue";

const ExpectedRevenueRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ExpectedRevenuePage />} >
                <Route path="lease" element={<LeaseExpectedRevenuePage />} />
                <Route path="staff-commute" element={<StaffCommuteExpectedRevenuePage />} />
            </Route>
            <Route path="lease/:id" element={<ViewLeaseExpectedRevenuePage />} />
            <Route path="staff-commute/:id" element={<ViewStaffCommuteExpectedRevenuePage />} />
        </Routes>
    );
};

export default ExpectedRevenueRoutes;