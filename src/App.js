import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this CSS file is imported for custom styles and animations

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', { message: input });
      const botMessage = { text: response.data.response, user: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the response. Please try again.');
    }

    setInput('');
  };

  return (
    <div className="max-w-full mx-auto p-6 min-h-screen text-white font-\'Arial\'">
      
      <div>
        <h1 className="text-8xl text-center mb-6 text-black font-extrabold">Football Wizard</h1>

        <div className="bg-[#c483e7] rounded-lg p-4 h-96 overflow-y-auto mb-4 shadow-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message mb-2 p-3 rounded-lg transition-all transform duration-300 ease-in-out ${
                message.user
                  ? 'bg-[#5841da] text-right fade-in-right'
                  : 'bg-[#5841da] text-left fade-in-left'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Football Wizard..."
            className= "p-3 border rounded-l-lg text-black"
          />

          <button
            type="submit"
            className="bg-[#c483e7] text-white p-3 rounded-r-lg hover:bg-[#d6acec]"
          >
            Send
          </button>

        </form>

      </div>
      
    </div>
  );
}

export default App;
