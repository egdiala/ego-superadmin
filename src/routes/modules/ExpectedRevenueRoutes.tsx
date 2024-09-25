import { Routes, Route } from "react-router-dom";
import { ExpectedRevenuePage, LeaseExpectedRevenueOrgPage, LeaseExpectedRevenuePage, StaffCommuteExpectedRevenueOrgPage, StaffCommuteExpectedRevenuePage, ViewLeaseExpectedRevenuePage, ViewStaffCommuteExpectedRevenuePage } from "@/pages/expected-revenue";

const ExpectedRevenueRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<ExpectedRevenuePage />} >
                <Route path="lease" element={<LeaseExpectedRevenuePage />} />
                <Route path="staff-commute" element={<StaffCommuteExpectedRevenuePage />} />
            </Route>
            <Route path="lease/:id" element={<ViewLeaseExpectedRevenuePage />} />
            <Route path="lease/:id/:orgId" element={<LeaseExpectedRevenueOrgPage />} />
            <Route path="staff-commute/:id" element={<ViewStaffCommuteExpectedRevenuePage />} />
            <Route path="staff-commute/:id/:orgId" element={<StaffCommuteExpectedRevenueOrgPage />} />
        </Routes>
    );
};

export default ExpectedRevenueRoutes;