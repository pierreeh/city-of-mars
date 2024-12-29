import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "@/contexts/AuthContext";

export default function PrivateRoutes() {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
