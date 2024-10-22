import { Routes, Route } from "react-router-dom";
import { ChargeStationsPage, ViewChargeStation } from "@/pages/charge-stations";

const ChargeStationsRoutes = () => {
  return (
    <Routes>
        <Route index element={<ChargeStationsPage />} />
        <Route path=":id" element={<ViewChargeStation />}  />
    </Routes>
  );
};

export default ChargeStationsRoutes;