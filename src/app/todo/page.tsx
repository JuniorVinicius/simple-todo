"use client";
import InputAdd from "@/components/Inputs/InputAdd";
import SwitchPage from "@/components/SwitchPage";
import TaskComponent from "@/components/TaskComponent";

const MOCK = [
  {
    id: 1,
    taskName: "Buy an car",
    done: false,
  },
  {
    id: 2,
    taskName: "Study",
    done: false,
    subtask: [
      {
        id: 2.1,
        taskName: "Math",
        done: false,
      },
      {
        id: 2.2,
        taskName: "English",
        done: false,
      },
    ],
  },
  {
    id: 3,
    taskName: "Buy egg",
    done: false,
    subtask: [
      {
        id: 3.1,
        taskName: "Red",
        done: false,
      },
      {
        id: 3.2,
        taskName: "white",
        done: false,
      },
    ],
  },
];

export default function Todo() {
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
        <TaskComponent tasks={MOCK}/>
      </div>
    </div>
  );
}
