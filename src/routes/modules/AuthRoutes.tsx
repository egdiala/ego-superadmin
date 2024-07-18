import { Routes, Route } from "react-router-dom";
import { ChangePasswordPage, ChangePasswordSuccessPage, ForgotPasswordPage, LoginPage, ResetPasswordPage, VerifyEmailPage } from "@/pages/auth"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="verify-email" element={<VerifyEmailPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="change-password" element={<ChangePasswordPage />} />
      <Route path="change-password/success" element={<ChangePasswordSuccessPage />} />
    </Routes>
  );
};

export default AuthRoutes;