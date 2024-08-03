import { Routes, Route } from "react-router-dom";
import { VehiclesPage } from "@/pages/vehicles";

const VehiclesRoutes = () => {
  return (
    <Routes>
        <Route index element={<VehiclesPage />} />
    </Routes>
  );
};

export default VehiclesRoutes;