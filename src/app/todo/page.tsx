"use client";
import InputAdd from "@/components/Inputs/InputAdd";
import SwitchPage from "@/components/SwitchPage";
import { useState } from "react";
import TaskCard from "@/components/TaskCard";

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-slate-100 pt-5 flex flex-col items-center">
      <h1 className="text-2xl text-center align-baseline">
        Simple Todo<span className="animate-ping">|</span>
      </h1>

      <div className="min-w-80 w-4/5 max-w-xl flex flex-col items-start px-2">
        <div className="w-full py-10">
          <SwitchPage />
        </div>
        <InputAdd />

        <div className="w-full">
          <div className="w-full">
            <TaskCard collapse hasChild />
            <div className="w-full bg-light px-2 py-1">
              <TaskCard />
              <TaskCard />
              <TaskCard />
              <div className="w-full pl-1">
                <InputAdd iconSize={16} title="Add New Subtask" placeholder="Subtask name"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
