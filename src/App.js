import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);
    setError('');
    setIsSending(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', { message: input });
      const botMessage = { text: response.data.response, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the response. Please try again.');
    } finally {
      setIsSending(false);
    }

    setInput('');
  };

  return (
    <div className="min-h-screen bg-white text-fuchsia-950 font-sans">
      <nav className="bg-fuchsia-950 text-white p-4">
        <div className="container mx-auto flex items-center">
          <img src="/pl-logo.png" alt="Premier League Logo" className="h-12 mr-4 hover:scale-110 duration-300" />
          <h1 className="text-2xl font-bold">Football Wizard</h1>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 rounded-lg p-4 h-[calc(100vh-240px)] overflow-y-auto mb-4 shadow-lg">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`message mb-2 p-3 rounded-lg ${
                  message.user
                    ? 'bg-fuchsia-950 text-white text-right ml-12'
                    : 'bg-white text-fuchsia-950 mr-12'
                }`}
              >
                {message.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Football Wizard..."
            className="flex-grow p-3 border border-fuchsia-950 rounded-l-lg text-fuchsia-950 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            type="submit"
            className={`bg-fuchsia-950 text-white p-3 rounded-r-lg hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 ${
              isSending ? 'animate-goal' : ''
            }`}
            disabled={isSending}
          >
            {isSending ? '⚽' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;