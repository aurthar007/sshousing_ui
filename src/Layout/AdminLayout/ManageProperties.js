import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://localhost:7252/api/Property";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    location: "",
    units: "",
    occupiedUnits: ""
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios.get(apiUrl)
      .then(res => {
        setProperties(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load properties.");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setFormData({ id: null, name: "", location: "", units: "", occupiedUnits: "" });
    setEditMode(false);
    setShowForm(true);
  };

  const openEditForm = (property) => {
    setFormData({
      id: property.id,
      name: property.name,
      location: property.location,
      units: property.units,
      occupiedUnits: property.occupiedUnits
    });
    setCurrentId(property.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSubmit = () => {
    const { id, name, location, units, occupiedUnits } = formData;

    if (!name || !location || units === "" || occupiedUnits === "") {
      alert("All fields are required");
      return;
    }

    const payload = {
      id: editMode ? id : 0, // Include ID for update
      name,
      location,
      units: parseInt(units),
      occupiedUnits: parseInt(occupiedUnits)
    };

    const request = editMode
      ? axios.put(`${apiUrl}/${id}`, payload)
      : axios.post(apiUrl, payload);

    request
      .then(() => {
        fetchProperties();
        setShowForm(false);
        setFormData({ id: null, name: "", location: "", units: "", occupiedUnits: "" });
      })
      .catch(() => alert("Operation failed"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    axios.delete(`${apiUrl}/${id}`)
      .then(() => fetchProperties())
      .catch(() => alert("Delete failed"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏠 Manage Properties</h2>

      <button
        onClick={openAddForm}
        style={{ marginBottom: 20, background: "#28a745", color: "#fff", padding: "10px 20px", border: "none", borderRadius: 5 }}
      >
        + Add Property
      </button>

      {showForm && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999
        }}>
          <div style={{
            width: 400, backgroundColor: "#fff", padding: 20,
            borderRadius: 10, position: "relative", boxShadow: "0 0 10px rgba(0,0,0,0.3)"
          }}>
            <button
              onClick={() => setShowForm(false)}
              style={{ position: "absolute", top: 10, right: 10, border: "none", fontSize: 20, background: "transparent", cursor: "pointer" }}
            >
              &times;
            </button>
            <h3>{editMode ? "✏️ Edit Property" : "🏗️ New Property"}</h3>

            {["name", "location", "units", "occupiedUnits"].map(field => (
              <input
                key={field}
                type={field.includes("unit") ? "number" : "text"}
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                style={{ margin: "10px 0", padding: 10, width: "100%", borderRadius: 5, border: "1px solid #ccc" }}
              />
            ))}

            <button
              onClick={handleSubmit}
              style={{ marginTop: 10, backgroundColor: "#007bff", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px" }}
            >
              {editMode ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading properties...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && properties.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Total Units</th>
              <th style={thStyle}>Occupied</th>
              <th style={thStyle}>Occupancy %</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => {
              const occupancy = p.units ? ((p.occupiedUnits / p.units) * 100).toFixed(1) : 0;
              return (
                <tr key={p.id}>
                  <td style={tdStyle}>{p.id}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.location}</td>
                  <td style={tdStyle}>{p.units}</td>
                  <td style={tdStyle}>{p.occupiedUnits}</td>
                  <td style={tdStyle}>{occupancy}%</td>
                  <td style={tdStyle}>
                    <button onClick={() => openEditForm(p)} style={actionBtn}>✏️</button>
                    <button onClick={() => handleDelete(p.id)} style={{ ...actionBtn, backgroundColor: "#dc3545" }}>🗑️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  borderBottom: "2px solid #ccc", padding: "10px", backgroundColor: "#f8f8f8", textAlign: "left"
};

const tdStyle = {
  padding: "8px", borderBottom: "1px solid #eee"
};

const actionBtn = {
  marginRight: 8,
  padding: "5px 10px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: 4,
  cursor: "pointer"
};

export default ManageProperties;
