import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Navigate, Link } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { axiosPrivate } from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { mutate, error } = useMutation(
    async (credentials) => await axiosPrivate.post("/auth", credentials),
    {
      onSuccess: (response) => {
        const token = response.data.accessToken;

        setToken(token);

        sessionStorage.setItem("login", true);

        navigate("/");

        setLoading(false);
      },
      onError: (err) => {
        setErrorMessage(err?.response?.data?.message);

        console.log(err);

        setLoading(false);
      },
    }
  );

  useEffect(() => {
    setFocus("username");
  }, []);

  const onSubmit = (data) => {
    setLoading(true);

    mutate(data);
  };

  if (sessionStorage.getItem("login")) {
    return <Navigate to={"/"} />;
  }

  if (loading) return <p>loading...</p>;

  return (
    <div className="h-screen flex">
      <div className="flex justify-center h-full items-center flex-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" m-2 w-full p-5 space-y-5 max-w-xl"
          autoComplete="off"
        >
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          {errorMessage && <span>{errorMessage}</span>}
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            {errors.username && (
              <span className="text-red-500">username is required</span>
            )}
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              className="pl-3 py-1 rounded-full border-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            {errors.password && (
              <span className="text-red-500">password is required</span>
            )}
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="pl-3 py-1 rounded-full border-2"
            />
          </div>
          <button
            className="bg-gray-600 text-white w-full p-1 rounded-sm hover:opacity-50 duration-150"
            disabled={loading}
            type="submit"
          >
            Login
          </button>
          <Link to={"/register"} className="flex w-full justify-center">
            <span>Create Account</span>
          </Link>
        </form>
      </div>
      <div className="bg-gradient-to-t  from-gray-500 to-gray-300 h-full hidden lg:flex flex-1">
        <h1 className="m-auto text-white uppercase text-3xl font-bold p-3">
          Connect with ease, message with joy
        </h1>
      </div>
    </div>
  );
};

export default Login;
