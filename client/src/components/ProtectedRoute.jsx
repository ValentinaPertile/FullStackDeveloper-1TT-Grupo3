import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/paths";

// Protege rutas que requieren sesión. Con requireAdmin, además exige role ADMIN.
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Esperar a que AuthProvider valide la cookie antes de decidir
  if (loading) {
    return (
      <p className="py-20 text-center text-stone-600" role="status">
        Verificando sesión...
      </p>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (requireAdmin && user.role !== "ADMIN") {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
