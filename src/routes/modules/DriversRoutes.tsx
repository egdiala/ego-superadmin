import { Routes, Route } from "react-router-dom";
import { DriverPage, DriverProfilePage } from "@/pages/drivers";

const DriversRoutes = () => {
  return (
    <Routes>
      <Route element={<DriverPage />} >
        <Route path="profile" element={<DriverProfilePage />} />
        <Route path="trips" element={<DriverProfilePage />} />
        <Route path="driver-payment" element={<DriverProfilePage />} />
        <Route path="ratings" element={<DriverProfilePage />} />
      </Route>
    </Routes>
  );
};

export default DriversRoutes;