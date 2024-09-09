import { Routes, Route } from "react-router-dom";
import { ServiceRequestPage, ServiceRequestsPage } from "@/pages/service-requests";

const ServiceRequestsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ServiceRequestsPage />} />
      <Route path=":id" element={<ServiceRequestPage />} />
    </Routes>
  );
};

export default ServiceRequestsRoutes;