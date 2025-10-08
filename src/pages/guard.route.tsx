import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface GuardRouteProps {
  children: ReactNode;
  isPageAllowed: boolean;
  isLoading?: boolean;
  error?: Error | string | null;
  fallbackPath?: string;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
}

const GuardRoute = ({ 
  children, 
  isPageAllowed, 
  isLoading = false,
  error = null,
  fallbackPath = "/",
  loadingComponent,
  errorComponent
}: GuardRouteProps) => {
  if (isLoading) {
    return loadingComponent || <div>Loading...</div>;
  }

  if (error) {
    return errorComponent || (
      <div>
        <h2>Error</h2>
        <p>{typeof error === 'string' ? error : error.message}</p>
        <Navigate to={fallbackPath} replace />
      </div>
    );
  }

  if (!isPageAllowed) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default GuardRoute;
