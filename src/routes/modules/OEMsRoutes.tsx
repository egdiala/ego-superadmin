import { Routes, Route } from "react-router-dom";
import { OEMsPage, ViewOEM } from "@/pages/oem";

const ChargeStationsRoutes = () => {
  return (
    <Routes>
        <Route index element={<OEMsPage />} />
        <Route path=":id" element={<ViewOEM />} />
    </Routes>
  );
};

export default ChargeStationsRoutes;