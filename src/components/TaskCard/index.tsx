"use client";
import CheckBox from "../Inputs/CheckBox";
import { useState } from "react";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { MdDragHandle } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TaskCardProps = {
  hasChild?: boolean;
  collapse?: boolean;
  taskName?: string;
  id?: string;
  onCollapse?: () => void;
};

export default function TaskCard({
  collapse = false,
  hasChild = false,
  taskName,
  id,
  onCollapse,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [collapsed, setIsCollapsed] = useState(false);
  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    onCollapse && onCollapse();
  };
  return (
    <div
      className={`w-full flex items-center p-2 hover:bg-hover-gray ${
        collapsed ? "bg-hover-gray" : ""
      }`}
    >
      <CheckBox />
      <div className="w-full m-0 ml-2 flex items-center justify-between">
        <div className="w-full">
          {!isEditing && (
            <p
              className="w-fit text-main-dark"
              onClick={() => setIsEditing(true)}
            >
              Buy Egg
            </p>
          )}
          {isEditing && (
            <input
              type="text"
              onBlur={() => setIsEditing(false)}
              className="w-full outline-0 bg-transparent"
              defaultValue="Buy Egg"
            />
          )}
        </div>
        <div className="flex items-center">
          {hasChild && (
            <div className="flex items-center">
              <span className="text-xs mr-1 text-dark-gray">2/3</span>
              <AiOutlineNodeIndex size={16} color="#ADADAD" />
            </div>
          )}
          <BsTrash3 size={16} color="#FF8B8B" className="mx-2 cursor-pointer" />
          <MdDragHandle
            size={16}
            color="#ADADAD"
            className="mr-2 cursor-grab"
          />
          {collapse && !collapsed && (
            <IoIosArrowDown
              size={20}
              color="#ADADAD"
              className="cursor-pointer"
              onClick={handleCollapse}
            />
          )}
          {collapse && collapsed && (
            <IoIosArrowUp
              size={20}
              color="#ADADAD"
              className="cursor-pointer"
              onClick={handleCollapse}
            />
          )}
        </div>
      </div>
    </div>
  );
}
