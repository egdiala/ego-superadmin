import { ReactNode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./modules";
import AuthLayout from "@/layouts/AuthLayout";
import { AnimatePresence } from "framer-motion";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;