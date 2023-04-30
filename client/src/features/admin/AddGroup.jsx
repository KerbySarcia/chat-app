import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../api/groups";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";

const AddGroup = () => {
  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
      reset();
      setIsOpen(false);
    },
  });

  const handleClick = () => setIsOpen(!isOpen);

  const handleCancelClick = (e) => {
    e.preventDefault();
    handleClick();
  };

  const handleAddClick = (data) => {
    mutate({ axiosPrivate, groupName: data.groupName });
  };

  return (
    <div className="text-center mt-5">
      <button
        onClick={handleClick}
        className="w-10 h-10 rounded-full bg-white "
      >
        +
      </button>
      <div
        className={`${
          !isOpen && "hidden"
        } absolute h-full top-0 left-0 w-full bg-black/20 flex justify-center items-center`}
      >
        <form
          onSubmit={handleSubmit(handleAddClick)}
          className="bg-white p-5 rounded-md space-y-4"
        >
          <h1>Name of the Group</h1>

          <input
            type="text"
            {...register("groupName", { required: true })}
            className="border-2 pl-3 py-1"
          />

          <div className="flex justify-around">
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-1 rounded hover:opacity-50 duration-150"
            >
              {isLoading ? "Loading" : "Add"}
            </button>

            <button
              onClick={handleCancelClick}
              className="hover:opacity-50 duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroup;
