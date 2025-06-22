import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch all messages on component mount
  useEffect(() => {
    fetchAllMessages();
  }, []);

  const fetchAllMessages = async () => {
    try {
      const res = await axios.get("https://localhost:7252/api/MessageBoard");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handlePostMessage = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !newMessage.trim()) {
      setError("Please enter your name and message.");
      return;
    }

    try {
      const newEntry = {
        username: userName.trim(),
        content: newMessage.trim(),
      };

      await axios.post("https://localhost:7252/api/MessageBoard", newEntry);

      setNewMessage("");
      setUserName("");
      setError("");
      fetchAllMessages(); // Refresh messages
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Error posting message. Ensure you're a registered user.");
    }
  };

  return (
    <div className="page-container">
      <h2>📢 Society Message Board</h2>
      <p>Share updates or issues with fellow residents.</p>

      <form className="message-form" onSubmit={handlePostMessage}>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          placeholder="Write your message..."
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Post Message</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="messages-section">
        <h4>Recent Messages</h4>
        {messages.length > 0 ? (
          <ul className="message-list">
            {messages.map((msg) => (
              <li key={msg.id} className="message-card">
                <div className="message-header">
                  <strong>{msg.username}</strong>
                  <small>{new Date(msg.postedAt).toLocaleString()}</small>
                </div>
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
