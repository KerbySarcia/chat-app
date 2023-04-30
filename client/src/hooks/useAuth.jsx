import React from "react";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { token } = useContext(AuthContext);

  if (token) {
    const decoded = jwtDecode(token);
    const { username, role, avatar } = decoded.userInfo;

    return { username, role, avatar };
  }

  return { username: "", role: "", avatar: "" };
};

export default useAuth;
