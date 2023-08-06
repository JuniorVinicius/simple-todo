"use client";
import React from "react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

type CheckBoxProps = {
  id?: string;
};

export default function CheckBox({ id }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className="flex gap-2 items-center relative" htmlFor={id}>
      <input
        type="checkbox"
        onChange={() => setIsChecked((prev) => !prev)}
        id={id}
        className="cursor-pointer appearance-none w-5 h-5 border border-light-gray rounded-sm bg-white checked:bg-sky-400 checked:border-0"
      />
      {isChecked && (
        <FaCheck color="#fff" className="absolute ml-0.5" size={15} />
      )}
    </label>
  );
}
