import { Routes, Route } from "react-router-dom";
import { ChargeStationsPage } from "@/pages/charge-stations";

const ChargeStationsRoutes = () => {
  return (
    <Routes>
        <Route index element={<ChargeStationsPage />} />
        {/* <Route path=":id" element={<RiderPage />} >
          <Route path="profile" element={<RiderProfile />} />
          <Route path="trips" element={<RiderTripsPage />} />
          <Route path="wallet" element={<RiderWalletPage />} />
          <Route path="ratings" element={<RiderRatingsPage />} />
        </Route> */}
    </Routes>
  );
};

export default ChargeStationsRoutes;