import { Navigate } from "react-router";

import { MCGameRoutePath } from "@/config";

interface GuardRouteProps {
  children: React.ReactNode;
  isPageAllowed: boolean;
}

const GuardRoute: React.FC<GuardRouteProps> = ({ children, isPageAllowed }) => {
  return (
    <>{isPageAllowed ? children : <Navigate to={MCGameRoutePath.HOME} />}</>
  );
};

export default GuardRoute;
