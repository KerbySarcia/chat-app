import React from "react";
import useToken from "./useToken";
import { axiosPrivate } from "../api/axios";

const useRefreshToken = () => {
  const { setToken } = useToken();
  const refresh = async () => {
    try {
      const response = await axiosPrivate.get("/auth/refresh");
      const accessToken = response.data.accessToken;
      setToken(accessToken);
      return accessToken;
    } catch (err) {
      throw err.response.data.message;
    }
  };
  return refresh;
};

export default useRefreshToken;
