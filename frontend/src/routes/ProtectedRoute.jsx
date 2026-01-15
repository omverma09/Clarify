import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or <Loader />
  }

  if (!user) {
    return <Navigate to="/clarify/login" replace />;
  }

  return <Outlet />;
}
