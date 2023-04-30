import React, { useState } from "react";
import RightChat from "./RightChat";
import SideBar from "./SideBar";
import { useQuery } from "@tanstack/react-query";

import Welcome from "./Welcome";
import { getGroups } from "../../api/groups";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();

  const { isLoading, isError, data, isSuccess, error } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups(axiosPrivate),
  });

  const [room, setRoom] = useState(null);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{JSON.stringify(error)}</p>;

  return (
    <div className="flex justify-center items-center bg-gray-300 h-screen">
      <div className="flex h-full w-full md:h-5/6 lg:max-w-5xl  ">
        <SideBar room={setRoom} groups={data} />
        {room ? (
          <RightChat
            room={room}
            setRoom={setRoom}
            groups={data}
            isSuccess={isSuccess}
          />
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default Home;
