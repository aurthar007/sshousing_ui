import React, { useState } from "react";
import "../../App.css";

const MessageBoard = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "Avijit", message: "Lift not working on 3rd floor." },
    { id: 2, name: "Riya", message: "Please clean the parking area." },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  const handlePostMessage = (e) => {
    e.preventDefault();
    if (userName.trim() && newMessage.trim()) {
      const newEntry = {
        id: messages.length + 1,
        name: userName,
        message: newMessage,
      };
      setMessages([newEntry, ...messages]);
      setNewMessage("");
      setUserName("");
    }
  };

  return (
    <div className="page-container">
      <h2>Message Board</h2>
      <p>Share and read messages with other society members.</p>

      <form className="message-form" onSubmit={handlePostMessage}>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          placeholder="Write your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button type="submit">Post Message</button>
      </form>

      <div className="messages-section">
        {messages.length > 0 ? (
          <ul className="message-list">
            {messages.map((msg) => (
              <li key={msg.id} className="message-card">
                <strong>{msg.name}:</strong>
                <p>{msg.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
