import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/auth/LoginPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<></>} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<></>} />
      </Route>
    </Routes>
  );
};
