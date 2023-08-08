"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";

type InputAddProps = {
  onBlur?: (value: string) => void;
  iconSize?: number;
  title?: string;
  placeholder?: string;
};

export default function InputAdd({
  onBlur,
  iconSize,
  title,
  placeholder,
}: InputAddProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const showInput = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    let show = false;
    if (!isVisible && !!onBlur && !show) {
      onBlur(inputValue);
    }

    return () => {
      show = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div className="w-full p-2 pl-1 border-b border-solid border-light-gray flex items-center">
      <BsPlusCircle
        size={iconSize ? iconSize : 26}
        color="#D9D9D9"
        className="cursor-pointer"
        onClick={showInput}
      />
      <div className="ml-2 w-full flex items-cente justify-between">
        {!isVisible ? (
          <p className="text-light-gray cursor-pointer" onClick={showInput}>
            {title ? title : "Add New Task"}
          </p>
        ) : (
          <input
            type="text"
            className="w-full bg-transparent outline-0"
            placeholder={placeholder ? placeholder : "Task name"}
            autoFocus={isVisible}
            onBlur={handleBlur}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        {isVisible && (
          <AiOutlineCheckCircle
            size={20}
            color="#c6e5b1"
            className="cursor-pointer"
            onClick={handleBlur}
            title="Save"
          />
        )}
      </div>
    </div>
  );
}
