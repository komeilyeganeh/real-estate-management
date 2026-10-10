import { Navigate, Outlet } from "react-router";
import { getAccessToken } from "../service/token.service";

export function ProtectedRoute() {
  const token = getAccessToken();
  return token ? <Outlet /> : <Navigate replace to="/login" />;
}
