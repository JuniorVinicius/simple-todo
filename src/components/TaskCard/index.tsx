"use client";
import CheckBox from "../Inputs/CheckBox";
import { useState } from "react";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { BsTrash3, BsPlusCircle } from "react-icons/bs";
import { MdDragHandle } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

type TaskCardProps = {
  hasChild?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  taskName?: string;
  id: string | number;
  childs?: ListItem[];
  isChild?: boolean;
  isChecked?: boolean;
  onCheckChange?: () => void;
  onCollapse?: () => void;
  onDrag?: () => void;
  onDrop?: () => void;
};

export default function TaskCard({
  collapsible = false,
  hasChild = false,
  isChecked = false,
  taskName,
  collapsed,
  id,
  childs,
  isChild,
  onCollapse,
  onCheckChange,
  onDrag,
  onDrop,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`w-full flex items-center p-2 hover:bg-hover-gray ${
        collapsed ? "bg-hover-gray" : ""
      }`}
    >
      <CheckBox
        id={id?.toString()}
        onCheckChange={onCheckChange}
        checked={isChecked}
      />
      <div className="w-full m-0 ml-2 flex items-center justify-between">
        <div className="w-full">
          {!isEditing && (
            <p
              className={`w-fit z-50 relative ${
                isChecked ? "line-through text-dark-gray" : "text-main-dark"
              }`}
              onClick={() => setIsEditing(true)}
            >
              {taskName}
            </p>
          )}
          {isEditing && (
            <input
              type="text"
              onBlur={() => setIsEditing(false)}
              className="w-full outline-0 bg-transparent"
              defaultValue={taskName}
            />
          )}
        </div>
        <div className="flex items-center">
          {hasChild && !!childs?.length && (
            <div className="flex items-center">
              <span className="text-xs mr-1 text-dark-gray">{`${
                childs?.filter((item) => item?.done).length
              }/${childs?.length}`}</span>
              <AiOutlineNodeIndex size={16} color="#ADADAD" />
            </div>
          )}
          <BsTrash3
            size={16}
            color="#FF8B8B"
            className="mx-2 cursor-pointer"
            title="Delete"
          />
          <div onMouseEnter={onDrag} onMouseMove={onDrag} onMouseLeave={onDrop}>
            <MdDragHandle
              size={16}
              color="#ADADAD"
              className="mr-2 cursor-grab"
              title="Move"
            />
          </div>
          {collapsible && !collapsed && (
            <IoIosArrowDown
              size={20}
              color="#ADADAD"
              className="cursor-pointer"
              onClick={onCollapse}
              title="Open"
            />
          )}
          {collapsible && collapsed && (
            <IoIosArrowUp
              size={20}
              color="#ADADAD"
              className="cursor-pointer"
              onClick={onCollapse}
              title="Close"
            />
          )}
          {!collapsible && !collapsed && !isChild && (
            <BsPlusCircle
              size={20}
              color="#ADADAD"
              className="cursor-pointer"
              onClick={onCollapse}
              title="Add subtask"
            />
          )}
          {!collapsible && collapsed && !isChild && (
            <CiCircleRemove
              size={20}
              color="#ADADAD"
              className="cursor-pointer"
              onClick={onCollapse}
              title="Cancel"
            />
          )}
        </div>
      </div>
    </div>
  );
}
