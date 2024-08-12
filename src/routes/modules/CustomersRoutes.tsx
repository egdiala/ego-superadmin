import { Routes, Route } from "react-router-dom";
import { CustomerDashboardPage, CustomerPage, CustomersPage, NewCustomersPage } from "@/pages/customers";

const CustomersRoutes = () => {
  return (
    <Routes>
      <Route index element={<CustomersPage />} />
      <Route path="new" element={<NewCustomersPage />} />
      <Route path=":id/*" element={<CustomerPage />} >
        <Route path="dashboard" element={<CustomerDashboardPage />} />
      </Route>
    </Routes>
  );
};

export default CustomersRoutes;