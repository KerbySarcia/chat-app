import React from "react";

const Group = ({ name, isClicked, onSelect }) => {
  return (
    <div
      onClick={(e) => onSelect(e)}
      name={name}
      className="cursor-pointer duration-200 group flex"
    >
      <div
        className={`${
          isClicked === name ? "opacity-100" : "opacity-0"
        } h-10 my-auto ml-2 rounded-full border-4 duration-100`}
      ></div>
      <div
        onClick={(e) => onSelect(e)}
        name={name}
        className={`ml-2 mr-5 my-3 bg-white w-10 h-10 transition-all ${
          isClicked === name ? "rounded  " : "rounded-full"
        } flex justify-center items-center group-hover:rounded`}
      >
        {name[0]}
      </div>
    </div>
  );
};

export default Group;
