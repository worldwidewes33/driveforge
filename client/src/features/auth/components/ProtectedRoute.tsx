/**
 * @fileoverview Protected route component that redirects unauthenticated users
 */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route wrapper that redirects unauthenticated users to signin
 * @param children - Child components to render if authenticated
 */
export function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to signin with the current location to return to after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
