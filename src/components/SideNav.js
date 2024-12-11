import logo from "../assets/defaultlogo.jpg";
import premLogo from "../assets/premlogo.png";

export const SideNav = () => {
  return (
    <div className="w-1/6 px-4 fixed top-0 left-0 pt-5 h-screen flex flex-col bg-fuchsia-950">
      <div className="flex flex-col items-center mb-4">
        <img src={premLogo} alt="Premier League Logo" className="w-16 h-16 mb-2" />
        <h1 className="px-1 text-center text-2xl urbanist-semibold z-50 text-white">
          Football Wizard
        </h1>
      </div>
      <div className="w-full h-full flex gap-4 flex-col justify-between items-center py-5">
        <div className="flex flex-col gap-3 w-full items-start">
          <button className="w-full urbanist-regular px-4 py-2 text-base bg-fuchsia-900 rounded-md text-white text-left">
            Chats
          </button>
          <a
            href="https://www.premierleague.com/"
            className="w-full urbanist-regular px-4 py-2 text-base bg-fuchsia-900 bg-opacity-30 hover:bg-opacity-100 transition duration-500 ease-in-out rounded-md text-white text-left"
          >
            Premier League Website
          </a>
        </div>
        <button className="w-full urbanist-regular px-4 py-2 text-base bg-fuchsia-900 rounded-md text-white text-left flex flex-row gap-2 items-center">
          <img src={logo} className="w-5 h-5 rounded-full overflow-hidden" alt="User" />{" "}
          Faaijot
        </button>
      </div>
    </div>
  );
};

