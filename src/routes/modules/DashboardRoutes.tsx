import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "@/pages";
import { DriversPage } from "@/pages/drivers/Drivers";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/drivers" element={<DriversPage />} />
    </Routes>
  );
};

export default DashboardRoutes;