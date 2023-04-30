import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddGroup from "../admin/AddGroup";
import Logout from "../auth/Logout";
import Group from "./Group";

const SideBar = ({ room, groups }) => {
  const [selectGroup, setSelectGroup] = useState("");
  const { avatar, role } = useAuth();

  const onSelect = (e) => {
    const name = e.target.getAttribute("name");
    setSelectGroup(name);
    room(name);
  };

  const groupsElement = groups.map((group, key) => (
    <Group
      key={key}
      name={group.name}
      onSelect={onSelect}
      isClicked={selectGroup}
    />
  ));

  return (
    <div className="bg-gray-900 flex flex-col justify-between md:rounded-l-md">
      <div className="">
        <img
          src={`/images/avatar-${avatar}.jpg`}
          alt="avatar"
          className="w-full h-16 object-cover  m-auto md:rounded-tl-md"
        />
        {role === "Admin" && <AddGroup />}
        <div className="mt-3">{groupsElement}</div>
      </div>

      <Logout />
    </div>
  );
};

export default SideBar;
