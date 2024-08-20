import { Routes, Route } from "react-router-dom";
import { RiderPage, RiderProfile, RiderRatingsPage, RidersPage, RiderTripsPage, RiderWalletPage } from "@/pages/riders";

const RidersRoutes = () => {
  return (
    <Routes>
        <Route index element={<RidersPage />} />
        <Route path=":id" element={<RiderPage />} >
          <Route path="profile" element={<RiderProfile />} />
          <Route path="trips" element={<RiderTripsPage />} />
          <Route path="wallet" element={<RiderWalletPage />} />
          <Route path="ratings" element={<RiderRatingsPage />} />
        </Route>
    </Routes>
  );
};

export default RidersRoutes;