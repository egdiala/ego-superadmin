import { Routes, Route } from "react-router-dom";
import { OrganizationWalletPage, RiderWalletPage, WalletPage } from "@/pages/wallet";

const WalletRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<WalletPage />} >
                <Route path="organization" element={<OrganizationWalletPage />} />
                <Route path="rider" element={<RiderWalletPage />} />
            </Route>
        </Routes>
    );
};

export default WalletRoutes;