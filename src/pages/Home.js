import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);
    setError("");
    setIsLoading(true);
    setIsAnimating(true);

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
      setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1 second
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <SideNav />
        <div className="w-5/6 h-screen fixed top-0 right-0 flex flex-col">
          <div className="rounded-lg w-full p-4 flex-grow h-auto overflow-y-auto mb-4 flex flex-col gap-3">
            {messages.map((message, index) => (
              <div key={index}>
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="flex mb-5 mr-4 ml-4">
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
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  Send
                  <span className={`ml-2 ${isAnimating ? 'animate-goal' : ''}`}>⚽</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

