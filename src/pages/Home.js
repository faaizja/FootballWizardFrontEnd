import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserMessage } from "../components/UserMessage";
import { ResponseMessage } from "../components/ResponseMessage";
import { SideNav } from "../components/SideNav";

export const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isHoveringBall, setIsHoveringBall] = useState(false);
  const [isClickedBall, setIsClickedBall] = useState(false);


  useEffect(() => {
    // Add initial welcome message
    setMessages([
      {
        text: "Welcome to Football Wizard! I can give you statistics on the Premier League. Ask away!",
        user: false,
      },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setError("");
    setIsLoading(true);
    setIsAnimating(true);

    // http://127.0.0.1:5000/api/chat
    // https://footballwizardbackend.onrender.com/api/chat
    try {
      const response = await axios.post("https://footballwizardbackend.onrender.com/api/chat", {
        message: input,
      });
      console.log("Backend response:", response.data);
      const botMessage = { text: response.data.response, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while fetching the response. Please try again."
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideNav isOpen={isSideNavOpen} setIsOpen={setIsSideNavOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="bg-fuchsia-900 p-2 sm:hidden">
          <button
            onClick={toggleSideNav}
            className="text-white"
          >
            ☰
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 animate-fade-in">
              {message.user ? (
                <UserMessage message={message.text} />
              ) : (
                <ResponseMessage message={message.text} />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="italic text-gray-500 flex flex-row items-center gap-2">
              <span className="loader"></span> Thinking...
            </div>
          )}
        </div>

        {error && <div className="text-red-500 p-4">{error}</div>}

        <form onSubmit={handleSubmit} className="p-4 border-t">

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Football Wizard..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
              disabled={isLoading}
            />

          <button
            type="submit"
            className="bg-fuchsia-900 transition duration-500 ease-in-out text-white p-2 rounded-r-lg hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 flex items-center justify-center"
            disabled={isLoading}
            onMouseEnter={() => setIsHoveringBall(true)}
            onMouseLeave={() => setIsHoveringBall(false)}
            onClick={() => {
              setIsClickedBall(true);
              setTimeout(() => setIsClickedBall(false), 1000); // Reset animation
            }}
          >
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                Send
                <span
                  className={`ml-2 ${
                    isHoveringBall && !isClickedBall
                      ? "animate-spin-ball"
                      : isClickedBall
                      ? "animate-shoot-ball"
                      : ""
                  }`}
                >
                  ⚽
                </span>
              </>
            )}
          </button>


          </div>

        </form>
      </div>

    </div>
  );
};
