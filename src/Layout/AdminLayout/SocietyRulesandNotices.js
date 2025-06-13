import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://localhost:7252/api";

const SocietyRulesAndNotices = () => {
  const [rules, setRules] = useState([]);
  const [notices, setNotices] = useState([]);
  const [newRule, setNewRule] = useState("");
  const [newNotice, setNewNotice] = useState("");

  // Fetch data on mount
  useEffect(() => {
    axios.get(`${API_BASE}/Rules`)
      .then(res => setRules(res.data))
      .catch(err => console.error("Error fetching rules:", err));

    axios.get(`${API_BASE}/Notices`)
      .then(res => setNotices(res.data))
      .catch(err => console.error("Error fetching notices:", err));
  }, []);

  const addRule = () => {
    if (newRule.trim() === "") return;

    axios.post(`${API_BASE}/Rules`, { description: newRule })
      .then(res => {
        setRules([...rules, res.data]);
        setNewRule("");
      })
      .catch(err => console.error("Error posting rule:", err));
  };

  const addNotice = () => {
    if (newNotice.trim() === "") return;

    axios.post(`${API_BASE}/Notices`, { message: newNotice })
      .then(res => {
        setNotices([...notices, res.data]);
        setNewNotice("");
      })
      .catch(err => console.error("Error posting notice:", err));
  };

  return (
    <div className="page-container" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Society Rules and Notices</h2>
      <p>Post new rules or public notices for your society.</p>

      <div className="rules-section" style={{ marginBottom: "30px" }}>
        <h3>Rules</h3>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule.description}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Enter new rule"
        />
        <button onClick={addRule} style={{ marginLeft: "10px" }}>Post Rule</button>
      </div>

      <div className="notices-section">
        <h3>Notices</h3>
        <ul>
          {notices.map((notice, index) => (
            <li key={index}>{notice.message}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          placeholder="Enter new notice"
        />
        <button onClick={addNotice} style={{ marginLeft: "10px" }}>Post Notice</button>
      </div>
    </div>
  );
};

export default SocietyRulesAndNotices;
