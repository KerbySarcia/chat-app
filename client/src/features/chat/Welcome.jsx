import React from "react";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username } = useAuth();
  return (
    <div className="bg-white w-full md:rounded-r-md grid place-items-center">
      <h1 className="md:text-4xl">Welcome {username}!😊❤️</h1>
    </div>
  );
};

export default Welcome;
