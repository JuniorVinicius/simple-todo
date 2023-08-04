"use client";
import { useState } from "react";

interface IGenerateButtonProps {
  title: string;
  activeId: number;
}

type SwitchPageProps = {
  doneTotal?: number;
};

export default function SwitchPage({ doneTotal }: SwitchPageProps) {
  const [active, setActive] = useState(1);

  const generateButton = ({ title, activeId }: IGenerateButtonProps) => {
    return (
      <span
        className={`cursor-pointer hover:text-sky-700 ${
          active === activeId ? "underline underline-offset-4 text-sky-700" : ""
        }`}
        onClick={() => setActive(activeId)}
      >
        {title}
      </span>
    );
  };

  return (
    <p className="text-base">
      {generateButton({ title: "To-do", activeId: 1 })} /{" "}
      {generateButton({ title: "Done", activeId: 2 })}
      {doneTotal && (
        <span className="bg-sky-300 text-white w-1.5 h-1.5 px-2 py-1 text-xs rounded-full ml-2">
          {doneTotal}
        </span>
      )}
    </p>
  );
}
