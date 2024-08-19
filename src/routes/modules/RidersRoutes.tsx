import { Routes, Route } from "react-router-dom";
import { RiderPage, RiderProfile, RidersPage } from "@/pages/riders";

const RidersRoutes = () => {
  return (
    <Routes>
        <Route index element={<RidersPage />} />
        <Route path=":id" element={<RiderPage />} >
            <Route path="profile" element={<RiderProfile />} />
            {/* <Route path="trips" element={<DriverTripsPage />} />
            <Route path="driver-payment" element={<DriverPaymentPage />} />
            <Route path="ratings" element={<DriverRatingsPage />} /> */}
        </Route>
    </Routes>
  );
};

export default RidersRoutes;