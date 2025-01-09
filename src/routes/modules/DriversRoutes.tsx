import { Routes, Route } from "react-router-dom";
import { DriverPage, DriverPaymentPage, DriverProfilePage, DriverRatingsPage, DriversPage, DriverTripsPage } from "@/pages/drivers";

const DriversRoutes = () => {
  return (
    <Routes>
      <Route index element={<DriversPage />} />
      <Route path=":id" element={<DriverPage />} >
        <Route path="profile" element={<DriverProfilePage />} />
        <Route path="trips" element={<DriverTripsPage />} />
        <Route path="driver-payment" element={<DriverPaymentPage />} />
        <Route path="ratings" element={<DriverRatingsPage />} />
      </Route>
    </Routes>
  );
};

export default DriversRoutes;