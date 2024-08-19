import { Routes, Route } from "react-router-dom";
import { RiderPage, RiderProfile, RidersPage, RiderTripsPage } from "@/pages/riders";

const RidersRoutes = () => {
  return (
    <Routes>
        <Route index element={<RidersPage />} />
        <Route path=":id" element={<RiderPage />} >
          <Route path="profile" element={<RiderProfile />} />
          <Route path="trips" element={<RiderTripsPage />} />
        </Route>
    </Routes>
  );
};

export default RidersRoutes;