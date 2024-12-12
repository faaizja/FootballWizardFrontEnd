import React from "react";
import logo from "../assets/defaultlogo.jpg";
import premLogo from "../assets/premlogo.png";

export const SideNav = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 ease-in-out fixed sm:relative sm:translate-x-0 z-20 w-64 sm:w-1/4 lg:w-1/6 h-screen bg-fuchsia-950 overflow-y-auto`}
      >
        <div className="p-4">

          <div className="flex flex-col items-center mb-4">
            <img src={premLogo} alt="Premier League Logo" className="w-16 h-16 mb-2 hover:scale-110 ease-in-out duration-500" />
            <h1 className="text-center text-xl sm:text-2xl urbanist-semibold text-white">
              Football Wizard
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full urbanist-regular px-4 py-2 text-sm sm:text-base bg-fuchsia-900 rounded-md text-white text-left">
              Chats
            </button>
            <a
              href="https://www.premierleague.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full urbanist-regular px-4 py-2 text-sm sm:text-base bg-fuchsia-900 bg-opacity-30 hover:bg-opacity-100 transition duration-500 ease-in-out rounded-md text-white text-left"
            >
              Premier League Website
            </a>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">

          <button className="w-full urbanist-regular px-4 py-2 text-sm sm:text-base bg-fuchsia-900 rounded-md text-white text-left flex flex-row gap-2 items-center">
            <img src={logo} className="w-5 h-5 rounded-full overflow-hidden" alt="User" />{" "}
            Faaiz/Harjot
          </button>

        </div>

      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
          onClick={() => setIsOpen(false)}>

        </div> )}

    </>
  );
};

