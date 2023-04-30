import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";
import useAuth from "../../hooks/useAuth";
import time from "../../utils/time";
import Message from "./Message";
import { deleteGroup } from "../../api/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const RightChat = ({ groups, isSuccess, room, setRoom }) => {
  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
      setRoom(null);
    },
  });

  const { username, avatar, role } = useAuth();

  const group = groups.find((value) => value.name === room);

  const [messages, setMessages] = useState([]);

  const [socket, setSocket] = useState(null);

  const scrollbar = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "onChange" });

  let container;

  useEffect(() => {
    const newSocket = io("http://localhost:3500");
    let timer;

    newSocket.emit("join-room", group.name);
    //Receive new messages in the room
    newSocket.on("room-message", (data) => {
      setMessages((messages) => [...messages, data]);

      timer = setTimeout(() => {
        container = scrollbar.current;
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }, 10);
    });

    setSocket(newSocket);

    if (isSuccess) {
      setTimeout(() => {
        container = scrollbar.current;
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }, 10);

      setMessages(group.messages);
    }

    return () => {
      newSocket.disconnect();
      clearTimeout(timer);
    };
  }, [group, scrollbar, room]);

  const sendMessage = (data) => {
    socket.emit("send-message", {
      groupName: group.name,
      name: username,
      text: data.message,
      time: time(),
      avatar: avatar,
    });
    setMessages((messages) => [
      ...messages,
      {
        groupName: group.name,
        name: username,
        text: data.message,
        time: time(),
        avatar: avatar,
      },
    ]);
    reset();
    setTimeout(() => {
      container = scrollbar.current;
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }, 10);
  };

  const handleDelete = () => {
    mutate({ axiosPrivate: axiosPrivate, id: group._id });
  };

  const messageElements = messages.map((data, key) => (
    <Message data={data} key={key} username={username} />
  ));

  return (
    <div className=" bg-gray-100 flex-1 flex flex-col md:rounded-r-md">
      <div className="bg-gray-700 p-5 text-white md:rounded-tr-md flex justify-between">
        <h1 className="">{group.name}</h1>
        {role === "Admin" && <button onClick={handleDelete}>Delete</button>}
      </div>
      <div ref={scrollbar} className="h-full flex overflow-y-auto p-5 ">
        <div className="mt-auto  flex w-full flex-col ">{messageElements}</div>
      </div>
      <form
        className="flex space-x-3 p-5"
        autoComplete="off"
        onSubmit={handleSubmit(sendMessage)}
      >
        <input
          placeholder="Enter your message"
          {...register("message", { required: true })}
          type="text"
          className="w-full pl-5 p-2 rounded-full"
        />
        <button
          type="submit"
          className={`${!isDirty || !isValid ? "opacity-50" : "opacity-100"} ${
            errors.message && "outline-red-500"
          }`}
          disabled={!isDirty || !isValid}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RightChat;
