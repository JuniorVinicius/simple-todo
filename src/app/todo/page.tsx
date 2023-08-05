"use client";
import InputAdd from "@/components/Inputs/InputAdd";
import SwitchPage from "@/components/SwitchPage";

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
      </div>
    </div>
  );
}
