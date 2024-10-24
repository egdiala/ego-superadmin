import { Routes, Route } from "react-router-dom";
import { DisbursementLogPage, DisbursementOverviewPage, DisbursementPage } from "@/pages/disbursement";

const DisbursementRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DisbursementPage />} >
        <Route path="logs" element={<DisbursementLogPage />} />
        <Route path="overview" element={<DisbursementOverviewPage />} />
      </Route>
    </Routes>
  );
};

export default DisbursementRoutes;