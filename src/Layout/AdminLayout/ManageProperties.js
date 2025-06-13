import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    location: "",
    units: ""
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios
      .get("https://localhost:7252/api/Property")
      .then((response) => {
        const result = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setProperties(result);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load properties.");
        console.error(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    axios
      .post("https://localhost:7252/api/Property", newProperty)
      .then((response) => {
        setProperties((prev) => [...prev, response.data]);
        setNewProperty({ name: "", location: "", units: "" });
        setShowForm(false);
      })
      .catch((err) => {
        console.error("Failed to add property:", err);
        alert("Error adding property");
      });
  };

  return (
    <div className="manage-properties-container" style={{ padding: "20px" }}>
      <h2>Manage Properties</h2>

      <button
        onClick={handleAddClick}
        style={{
          marginBottom: "20px",
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        + Add Property
      </button>

      {/* Add Property Form */}
      {showForm && (
        <div
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9"
          }}
        >
          <h4>Enter Property Details</h4>
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={newProperty.name}
            onChange={handleChange}
            style={{
              margin: "5px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newProperty.location}
            onChange={handleChange}
            style={{
              margin: "5px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="number"
            name="units"
            placeholder="Total Units"
            value={newProperty.units}
            onChange={handleChange}
            style={{
              margin: "5px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginLeft: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Error/Loading States */}
      {loading && <p>Loading properties...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Property Table */}
      {!loading && properties.length > 0 && (
        <table className="property-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>ID</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Property Name</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Location</th>
              <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Total Units</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{property.id}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{property.name}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{property.location}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{property.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProperties;
