import React, { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useToken from "../../hooks/useToken";
import { Link, Outlet } from "react-router-dom";

const SessionLogin = () => {
  const { token } = useToken();
  const refresh = useRefreshToken();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLogin, setIsLogin] = useState(
    JSON.parse(sessionStorage.getItem("login")) || false
  );

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true);
        await refresh();
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        setErrorMessage(err);
        setLoading(false);
      }
    };

    if (!token && isLogin) verifyRefreshToken();
  }, [token]);

  const clearLogin = () => {
    sessionStorage.removeItem("login");
  };

  let content;

  if (!isLogin) content = <Outlet />;
  if (loading) content = <p>Loading...</p>;
  if (errorMessage)
    content = (
      <Link onClick={clearLogin} to={"/login"}>
        Login again
      </Link>
    );
  if (token && isLogin) content = <Outlet />;

  return content;
};

export default SessionLogin;
