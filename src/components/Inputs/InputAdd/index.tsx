"use client";
import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

type InputAddProps = {
  onBlur?: () => void;
};

export default function InputAdd({ onBlur }: InputAddProps) {
  const [isVisible, setIsVisible] = useState(false);
  const showInput = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
    onBlur && onBlur();
  };
  return (
    <div className="w-full p-2 pl-0 border-b border-solid border-light-gray flex items-center">
      <BsPlusCircle
        size={26}
        color="#D9D9D9"
        className="cursor-pointer"
        onClick={showInput}
      />
      <div className="ml-2">
        {!isVisible ? (
          <p className="text-light-gray cursor-pointer" onClick={showInput}>
            Add New Task
          </p>
        ) : (
          <input
            type="text"
            className="w-full bg-transparent outline-0"
            placeholder="Task name"
            autoFocus={isVisible}
            onBlur={handleBlur}
          />
        )}
      </div>
    </div>
  );
}
