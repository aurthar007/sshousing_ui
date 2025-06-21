import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const BillingAndPayment = () => {
  const [billings, setBillings] = useState([]);
  const [formData, setFormData] = useState({
    id: 0, name: "", flat: "", rentStatus: "",
    serviceFees: "", dues: "", rent: "", amount: "", date: ""
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
      .catch((err) => {
        console.error("Error fetching billing data:", err);
        alert("Could not load billing data. Make sure API is running.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      .catch((err) => {
        console.error("Error saving billing data:", err);
        alert("Failed to save billing. Please check your input or server.");
      });
  };

  const deleteBilling = (id) => {
    if (window.confirm("Are you sure you want to delete this billing record?")) {
      axios.delete(`https://localhost:7252/api/Billing/${id}`)
        .then(() => getAllBillings())
        .catch((err) => {
          console.error("Error deleting billing:", err);
          alert("Failed to delete billing. Try again.");
        });
    }
  };

  const fillForm = (data) => {
    setFormData({ ...data, date: data.date?.split("T")[0] ?? "" });
  };

  const resetForm = () => {
    setFormData({
      id: 0, name: "", flat: "", rentStatus: "",
      serviceFees: "", dues: "", rent: "", amount: "", date: ""
    });
    setIsEditing(false);
    setIsViewing(false);
    setShowModal(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#007bff" }}>Billing Management</h2>
      <button onClick={() => { resetForm(); setShowModal(true); }}
        style={{ backgroundColor: "#28a745", color: "#fff", padding: "10px 16px", border: "none", borderRadius: "4px", marginBottom: "16px", cursor: "pointer" }}>
        + Add Billing
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#343a40", color: "#fff" }}>
          <tr>
            <th>ID</th><th>Name</th><th>Flat</th><th>Rent Status</th>
            <th>Service Fees</th><th>Dues</th><th>Rent</th><th>Amount</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {billings.length === 0 ? (
            <tr><td colSpan="10" align="center">No data available</td></tr>
          ) : (
            billings.map((b, i) => (
              <tr key={b.id} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                <td>{b.id}</td><td>{b.name}</td><td>{b.flat}</td><td>{b.rentStatus}</td>
                <td>{b.serviceFees}</td><td>{b.dues}</td><td>{b.rent}</td><td>{b.amount}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>
                  <FaEye onClick={() => { fillForm(b); setIsViewing(true); setShowModal(true); }} style={{ cursor: "pointer", marginRight: 8, color: "#17a2b8" }} />
                  <FaEdit onClick={() => { fillForm(b); setIsEditing(true); setShowModal(true); }} style={{ cursor: "pointer", marginRight: 8, color: "#ffc107" }} />
                  <FaTrash onClick={() => deleteBilling(b.id)} style={{ cursor: "pointer", color: "#dc3545" }} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", padding: "20px", borderRadius: "8px", width: "400px"
          }}>
            <h3 style={{ marginBottom: 20 }}>
              {isViewing ? "View Billing" : isEditing ? "Edit Billing" : "Add Billing"}
            </h3>
            <form onSubmit={handleSubmit}>
              {[
                { label: "Name", name: "name" },
                { label: "Flat", name: "flat" },
                { label: "Rent Status", name: "rentStatus" },
                { label: "Service Fees", name: "serviceFees", type: "number" },
                { label: "Dues", name: "dues", type: "number" },
                { label: "Rent", name: "rent", type: "number" },
                { label: "Amount", name: "amount", type: "number" },
                { label: "Date", name: "date", type: "date" }
              ].map(({ label, name, type = "text" }) => (
                <div key={name} style={{ marginBottom: 12 }}>
                  <label>{label}</label>
                  <input
                    name={name} type={type} value={formData[name]}
                    onChange={handleChange} readOnly={isViewing}
                    style={{ width: "100%", padding: "8px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                {!isViewing && (
                  <button type="submit" style={{
                    backgroundColor: "#007bff", color: "#fff", padding: "8px 16px",
                    border: "none", borderRadius: "4px"
                  }}>
                    {isEditing ? "Update" : "Add"}
                  </button>
                )}
                <button type="button" onClick={resetForm} style={{
                  backgroundColor: "#6c757d", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "4px"
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
