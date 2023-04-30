import React, { useEffect, useState } from "react";
import avatarOne from "/images/avatar-one.jpg";
import avatarTwo from "/images/avatar-two.jpg";
import avatarThree from "/images/avatar-three.jpg";
import avatarFour from "/images/avatar-four.jpg";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [avatar, setAvatar] = useState("one");
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation(
    (credentials) => axios.post("/users", credentials),
    {
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const onClickAvatar = (e) => {
    setAvatar(e.target.name);
  };

  const onSubmit = (data) => {
    mutate({ ...data, avatar });
  };

  useEffect(() => {
    setFocus("username");
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mx-auto mt-20 w-fit">
        <h1 className="text-center mb-5">Select your avatar</h1>
        <div className="grid grid-cols-2 gap-3">
          <img
            src={avatarOne}
            alt="avatar-one"
            name="one"
            onClick={onClickAvatar}
            className={`${
              avatar === "one" && "border-8"
            } border-cyan-900 h-32 w-32 object-cover cursor-pointer hover:opacity-50 duration-100`}
          />
          <img
            src={avatarTwo}
            alt="avatar-two"
            name="two"
            onClick={onClickAvatar}
            className={`${
              avatar === "two" && "border-8"
            } border-cyan-900 h-32 w-32 object-cover cursor-pointer hover:opacity-50 duration-100`}
          />
          <img
            src={avatarThree}
            alt="avatar-three"
            name="three"
            onClick={onClickAvatar}
            className={`${
              avatar === "three" && "border-8"
            } border-cyan-900 h-32 w-32 object-cover cursor-pointer hover:opacity-50 duration-100`}
          />
          <img
            src={avatarFour}
            alt="avatar-four"
            name="four"
            onClick={onClickAvatar}
            className={`${
              avatar === "four" && "border-8"
            } border-cyan-900 h-32 w-32 object-cover cursor-pointer hover:opacity-50 duration-100`}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="mt-5 space-y-5"
        >
          <h1 className="text-center">{error?.response?.data?.message}</h1>
          <div className="flex flex-col">
            <label htmlFor="username">Username </label>
            {errors?.username?.type === "required" && (
              <span className="text-red-500">*Username is Required</span>
            )}
            {errors?.username?.type === "maxLength" && (
              <span className="text-red-500 w-10">
                *Username cannot exceed to 15 characters
              </span>
            )}
            {errors?.username?.type === "minLength" && (
              <span className="text-red-500 w-full w-10">
                *Username cannot be less than 5 characters
              </span>
            )}
            <input
              className="pl-3 py-1 rounded-full border-2"
              type="text"
              {...register("username", {
                required: true,
                minLength: 5,
                maxLength: 15,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            {errors?.password?.type === "required" && (
              <span className="text-red-500">*Password is Required</span>
            )}
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 5,
                maxLength: 15,
              })}
              className="pl-3 py-1 rounded-full border-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white rounded-sm py-1 hover:opacity-50 duration-150"
          >
            Register
          </button>
          <Link to={"/login"} className="flex w-full justify-center">
            <span>Back</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
