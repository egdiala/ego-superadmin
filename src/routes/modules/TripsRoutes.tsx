import { Routes, Route } from "react-router-dom";
import { TripPage, TripsPage } from "@/pages/trips";

const TripsRoutes = () => {
  return (
    <Routes>
      <Route index element={<TripsPage />} />
      <Route path=":id" element={<TripPage />} />
    </Routes>
  );
};

export default TripsRoutes;