import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const BillingAndPayment = () => {
  const [billings, setBillings] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    flat: "",
    rentStatus: "",
    serviceFees: "",
    dues: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    getAllBillings();
  }, []);

  const getAllBillings = () => {
    axios.get("https://localhost:7252/api/Billing")
      .then((res) => setBillings(res.data))
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing
      ? `https://localhost:7252/api/Billing/${formData.id}`
      : "https://localhost:7252/api/Billing";
    const method = isEditing ? axios.put : axios.post;

    method(url, formData)
      .then(() => {
        getAllBillings();
        resetForm();
      })
      .catch((err) => console.error("Error saving billing data:", err));
  };

  const deleteBilling = (id) => {
    if (window.confirm("Are you sure you want to delete this billing record?")) {
      axios.delete(`https://localhost:7252/api/Billing/${id}`)
        .then(() => getAllBillings())
        .catch((err) => console.error("Error deleting billing:", err));
    }
  };

  const fillForm = (data) => {
    setFormData({ ...data });
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      flat: "",
      rentStatus: "",
      serviceFees: "",
      dues: ""
    });
    setShowModal(false);
    setIsEditing(false);
    setIsViewing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#007bff", marginBottom: "16px" }}>Billing Management</h2>
      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "16px"
        }}
      >
        + Add Billing
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f8f9fa" }}>
        <thead style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Flat</th>
            <th>Rent Status</th>
            <th>Service Fees</th>
            <th>Dues</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((b, index) => (
            <tr key={b.id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f1f1" }}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.flat}</td>
              <td>{b.rentStatus}</td>
              <td>{b.serviceFees}</td>
              <td>{b.dues}</td>
              <td>
                <FaEye
                  onClick={() => { fillForm(b); setIsViewing(true); setShowModal(true); }}
                  style={{ cursor: "pointer", marginRight: "10px", color: "#17a2b8" }}
                />
                <FaEdit
                  onClick={() => { fillForm(b); setIsEditing(true); setShowModal(true); }}
                  style={{ cursor: "pointer", marginRight: "10px", color: "#ffc107" }}
                />
                <FaTrash
                  onClick={() => deleteBilling(b.id)}
                  style={{ cursor: "pointer", color: "#dc3545" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#ffffff", padding: "20px",
            borderRadius: "10px", width: "400px"
          }}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>
              {isViewing ? "View Billing" : isEditing ? "Edit Billing" : "Add Billing"}
            </h3>
            <form onSubmit={handleSubmit}>
              {["name", "flat", "rentStatus", "serviceFees", "dues"].map((field, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "14px" }}>
                    {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  </label>
                  <input
                    type={["serviceFees", "dues"].includes(field) ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    readOnly={isViewing}
                    required
                    style={{
                      width: "100%", padding: "8px", fontSize: "14px",
                      borderRadius: "4px", border: "1px solid #ccc"
                    }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                {!isViewing && (
                  <button type="submit" style={{
                    backgroundColor: "#007bff", color: "#fff",
                    padding: "8px 16px", border: "none",
                    borderRadius: "4px", cursor: "pointer"
                  }}>
                    {isEditing ? "Update" : "Add"}
                  </button>
                )}
                <button type="button" onClick={resetForm} style={{
                  backgroundColor: "#6c757d", color: "#fff",
                  padding: "8px 16px", border: "none",
                  borderRadius: "4px", cursor: "pointer"
                }}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingAndPayment;
