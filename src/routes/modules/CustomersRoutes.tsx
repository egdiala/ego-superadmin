import { Routes, Route } from "react-router-dom";
import { AssignOrganizationVehiclesPage, CustomerDashboardPage, CustomerDriversPage, CustomerPage, CustomerRatingsPage, CustomersPage, CustomerStaffsPage, CustomerTripHistoryPage, CustomerTripPaymentPage, CustomerVehiclesPage, CustomerWalletPage, EditCustomerPage, NewCustomersPage, RevokeOrganizationVehiclesPage } from "@/pages/customers";

const CustomersRoutes = () => {
  return (
    <Routes>
      <Route index element={<CustomersPage />} />
      <Route path="new" element={<NewCustomersPage />} />
      <Route path=":id/*" element={<CustomerPage />} >
        <Route path="dashboard" element={<CustomerDashboardPage />} />
        <Route path="vehicles" element={<CustomerVehiclesPage />} />
        <Route path="drivers" element={<CustomerDriversPage />} />
        <Route path="ratings" element={<CustomerRatingsPage />} />
        <Route path="staffs" element={<CustomerStaffsPage />} />
        <Route path="trip-history" element={<CustomerTripHistoryPage />} />
        <Route path="trip-payments" element={<CustomerTripPaymentPage />} />
        <Route path="wallet" element={<CustomerWalletPage />} />
      </Route>
      <Route path=":id/edit" element={<EditCustomerPage />} />
      <Route path=":id/assign" element={<AssignOrganizationVehiclesPage />} />
      <Route path=":id/revoke" element={<RevokeOrganizationVehiclesPage />} />
    </Routes>
  );
};

export default CustomersRoutes;