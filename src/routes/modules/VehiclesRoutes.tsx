import { Routes, Route } from "react-router-dom";
import { VehicleAssignPage, VehiclePage, VehiclePaymentPage, VehicleProfilePage, VehiclesPage } from "@/pages/vehicles";

const VehiclesRoutes = () => {
  return (
    <Routes>
        <Route index element={<VehiclesPage />} />
        <Route path=":id" element={<VehiclePage />}>
          <Route path="profile" element={<VehicleProfilePage />} />
          <Route path="vehicle-payment" element={<VehiclePaymentPage />} />
        </Route>
        <Route path=":id/assign" element={<VehicleAssignPage />} />
    </Routes>
  );
};

export default VehiclesRoutes;