import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const queryQlient = useQueryClient();

  const navigate = useNavigate();

  const logout = async () => {
    await axiosPrivate
      .post("/auth/logout")
      .then(async () => {
        queryQlient.clear();
        await queryQlient.invalidateQueries();
        sessionStorage.removeItem("login");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button className="mb-10 text-white" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
