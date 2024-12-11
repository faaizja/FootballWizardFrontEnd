import logo from "../assets/defaultlogo.jpg";

export const SideNav = () => {
  return (
    <div className="w-1/6 px-4 fixed top-0 left-0 pt-5 h-screen flex flex-col bg-fuchsia-950">
      <h1 className="px-1 text-left text-2xl urbanist-semibold z-50 text-white">
        Football Wizard
      </h1>
      <div className="w-full h-full flex gap-4 flex-col justify-between items-center py-5">
        <div className="flex flex-col gap-3">
          <button className="w-min-full urbanist-regular px-4 py-2 text-base bg-fuchsia-900 rounded-md text-white text-left">
            Chats
          </button>
          <a
            href="https://www.premierleague.com/"
            target="_blank"
            className="w-min-full urbanist-regular px-4 py-2 text-base bg-fuchsia-900 bg-opacity-30 hover:bg-opacity-100 transition duration-500 ease-in-out rounded-md text-white text-left"
          >
            Premier Leauge Website
          </a>
        </div>
        <button className="w-full urbanist-regular px-4 py-2 text-base bg-fuchsia-900 rounded-md text-white text-left flex flex-row gap-2 items-center">
          <img src={logo} className="w-5 h-5 rounded-full overflow-hidden" />{" "}
          Faaijot
        </button>
      </div>
    </div>
  );
};
