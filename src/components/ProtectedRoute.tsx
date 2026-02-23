import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  if (isAuth === null) return null; // prevent flicker

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;