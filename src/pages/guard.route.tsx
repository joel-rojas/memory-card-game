import { Navigate } from "react-router-dom";

import { MCGameRoutePath } from "@config";

interface GuardRouteProps {
  children: JSX.Element;
  isPageAllowed: boolean;
}

const GuardRoute: React.FC<GuardRouteProps> = ({
  children,
  isPageAllowed,
}) => {
  return (
    <>{isPageAllowed ? children : <Navigate to={MCGameRoutePath.HOME} />}</>
  );
};

export default GuardRoute;
