import { Routes, Route } from "react-router-dom";
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, VerifyEmailPage } from "@/pages/auth"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="verify-email" element={<VerifyEmailPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AuthRoutes;