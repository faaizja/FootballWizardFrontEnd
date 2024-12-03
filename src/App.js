import React, { useState } from 'react';
import axios from 'axios';

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
        console.log('Backend response:', response.data); // Log the response
        const botMessage = { text: response.data.response, user: false };
        setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching the response. Please try again.');
    }

    setInput('');
};


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-7xl font-bold text-center mb-6">Football Wizard</h1>
      <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 p-2 rounded-lg ${message.user ? 'bg-blue-200 text-right' : 'bg-white'}`}>
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
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;