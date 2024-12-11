import React from "react";
import logo from "../assets/defaultlogo.jpg";

export const UserMessage = ({ message }) => {
  return (
    <div className="px-4 py-2 bg-fuchsia-900 rounded-md flex flex-row gap-2 items-start">
      <img src={logo} className="w-6 h-6 mt-0.5 rounded-full overflow-hidden" alt="User" />{" "}
      <p className="text-white text-base sm:text-lg urbanist-regular">{message}</p>
    </div>
  );
};

