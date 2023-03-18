import { Outlet, Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = Partial<{
  isAllowed: boolean;
  redirectPath: string;
  children: JSX.Element;
}>;
export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();
  if (!isAllowed) {
    return (
      <Navigate
        to={redirectPath}
        replace
        state={{ originPath: location.pathname }}
      />
    );
  }

  return children ? children : <Outlet />;
};
