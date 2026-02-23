import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface Props {
  children: ReactNode;
}
const PublicRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token"); // or your auth logic

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;