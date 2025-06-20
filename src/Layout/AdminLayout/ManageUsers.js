import React, { useState, useEffect } from "react";

const ManageUsers = () => {
  const roles = ["Admin", "Owner", "Tenant", "Property Manager", "Maintenance Staff"];
  const [activeTab, setActiveTab] = useState("Admin");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin"
  });

  const apiBaseUrl = "https://localhost:7252/api/ManageUsers";

  useEffect(() => {
    fetchUsersByRole(activeTab);
  }, [activeTab]);

  const fetchUsersByRole = async (role) => {
    try {
      const res = await fetch(`${apiBaseUrl}/${encodeURIComponent(role)}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTabChange = (role) => {
    setActiveTab(role);
    setFormData((prev) => ({ ...prev, role, name: "", email: "", phone: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { name, email, phone, role } = formData;
    if (!name || !email || !phone || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const createdUser = await res.json();
        setUsers((prev) => [...prev, createdUser]);
        setFormData({ name: "", email: "", phone: "", role: activeTab });
        setShowModal(false);
      } else {
        alert("Error registering user");
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage {activeTab}s</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleTabChange(role)}
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === role ? "#007bff" : "#e0e0e0",
              color: activeTab === role ? "#fff" : "#333"
            }}
          >
            {role}s
          </button>
        ))}
      </div>

      {/* Register Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        + Register New {activeTab}
      </button>

      {/* Modal Popup Form */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <button
              onClick={() => setShowModal(false)}
              style={styles.closeButton}
            >
              &times;
            </button>
            <h4>Register New {activeTab}</h4>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button onClick={handleRegister} style={styles.registerButton}>
              Register
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {users.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noData}>No {activeTab.toLowerCase()}s registered yet.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Segoe UI, sans-serif"
  },
  heading: {
    marginBottom: "20px",
    color: "#333"
  },
  tabs: {
    marginBottom: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  tabButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s"
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "12px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #bbb"
  },
  registerButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    padding: "12px",
    borderBottom: "2px solid #ccc",
    textAlign: "left",
    backgroundColor: "#f0f0f0"
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee"
  },
  noData: {
    color: "#999",
    fontStyle: "italic"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    position: "relative",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ManageUsers;
