import React from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const { role } = useAuth();
  const location = useLocation();

  let content;

  if (role === "Admin" || role === "User") content = <Outlet />;
  else content = <Navigate to={"/login"} state={{ from: location }} replace />;

  return content;
};

export default RequireAuth;
