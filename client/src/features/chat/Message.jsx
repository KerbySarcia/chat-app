import React from "react";

const Message = ({ data, username }) => {
  return (
    <div
      className={`flex items-center w-full ${
        username !== data.name ? "flex-row-reverse " : "justify-end"
      }`}
    >
      <div
        className={`flex flex-col group cursor-default space-x-3 ${
          username !== data.name && "mr-auto"
        }`}
      >
        <p
          className={` text-center rounded-lg ${
            username !== data.name
              ? "rounded-bl-none bg-gray-300"
              : "rounded-br-none text-white bg-gray-700"
          } p-2 `}
        >
          {data.text}
        </p>
        <span className="opacity-0 group-hover:opacity-100 duration-200 ">
          {data.time}
        </span>
      </div>
      {username !== data.name && (
        <img
          alt={data.avatar}
          src={`/images/avatar-${data.avatar}.jpg`}
          className="mx-3 w-8 h-8 rounded-full object-cover flex justify-center items-center"
        />
      )}
    </div>
  );
};

export default Message;
