import { Routes, Route } from "react-router-dom";
import { ServiceRequestsPage } from "@/pages/service-requests";

const ServiceRequestsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ServiceRequestsPage />} />
      {/* <Route path=":id" element={<TripPage />} /> */}
    </Routes>
  );
};

export default ServiceRequestsRoutes;