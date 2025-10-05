import { JSX } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  // Check if both token and user exist
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default RequireAuth;