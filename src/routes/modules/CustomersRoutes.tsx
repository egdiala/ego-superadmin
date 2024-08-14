import { Routes, Route } from "react-router-dom";
import { AssignOrganizationVehiclesPage, CustomerDashboardPage, CustomerPage, CustomersPage, EditCustomerPage, NewCustomersPage } from "@/pages/customers";

const CustomersRoutes = () => {
  return (
    <Routes>
      <Route index element={<CustomersPage />} />
      <Route path="new" element={<NewCustomersPage />} />
      <Route path=":id/*" element={<CustomerPage />} >
        <Route path="dashboard" element={<CustomerDashboardPage />} />
      </Route>
      <Route path=":id/edit" element={<EditCustomerPage />} />
      <Route path=":id/assign" element={<AssignOrganizationVehiclesPage />} />
    </Routes>
  );
};

export default CustomersRoutes;