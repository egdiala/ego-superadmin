import { Routes, Route } from "react-router-dom";
import { CreateRolePage, EditRolePage } from "@/pages/accounts";

const RolesRoutes = () => {
  return (
    <Routes>
      <Route path="create" element={<CreateRolePage />} />
      <Route path="edit" element={<EditRolePage />} />
    </Routes>
  );
};

export default RolesRoutes;