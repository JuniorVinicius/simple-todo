import SwitchPage from "@/components/SwitchPage";
import React from "react";

export default function Todo() {
  return (
    <div className="w-screen min-h-screen bg-slate-100 pt-5 flex flex-col items-center">
      <h1 className="text-2xl text-center align-baseline">
        Simple Todo<span className="animate-ping">|</span>
      </h1>

      <div className="w-72 max-w-lgflex flex-col items-start">
        <div className="w-full py-10">
          <SwitchPage />
        </div>
      </div>
    </div>
  );
}
