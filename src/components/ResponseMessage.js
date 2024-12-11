import logo from "../assets/premlogo.png";

export const ResponseMessage = ({ message }) => {
  return (
    <div className="px-4 py-2 bg-stone-100 rounded-md flex flex-row gap-2 items-start">
      <img src={logo} alt="icon" className="w-6 h-6 mt-0.5" />{" "}
      <p className="text-black text-lg urbanist-regular">{message}</p>
    </div>
  );
};
