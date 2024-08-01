import { Routes, Route } from "react-router-dom";
import { CustomersPage, NewCustomersPage } from "@/pages/customers";

const CustomersRoutes = () => {
  return (
    <Routes>
      <Route index element={<CustomersPage />} />
      <Route path="new" element={<NewCustomersPage />} />
    </Routes>
  );
};

export default CustomersRoutes;