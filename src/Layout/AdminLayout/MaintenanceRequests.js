import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const MaintenanceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    issue: "",
    assignedTo: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ✅ Correct GET request
  const fetchRequests = () => {
    axios
      .get("https://localhost:7252/api/MaintenanceRequest")
      .then((res) => setRequests(res.data))
      .catch(() => alert("Failed to fetch maintenance requests."));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Handle create/update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      axios
        .put(`https://localhost:7252/api/MaintenanceRequest/${editingId}`, formData)
        .then(() => {
          fetchRequests();
          resetForm();
        })
        .catch(() => alert("Failed to update request"))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("https://localhost:7252/api/MaintenanceRequest", formData)
        .then(() => {
          fetchRequests();
          resetForm();
        })
        .catch(() => alert("Failed to add request"))
        .finally(() => setLoading(false));
    }
  };

  const handleEdit = (req) => {
    setEditingId(req.id);
    setFormData(req);
    setShowModal(true);
  };

  // ✅ DELETE call
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    axios
      .delete(`https://localhost:7252/api/MaintenanceRequest/${id}`)
      .then(() => fetchRequests())
      .catch(() => alert("Failed to delete request"));
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      id: 0,
      issue: "",
      assignedTo: "",
      status: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Maintenance Requests</h1>
      <button className="add-task-button" onClick={() => setShowModal(true)}>
        + Add Request
      </button>

      <table className="styled-table" border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.issue}</td>
              <td>{r.assignedTo}</td>
              <td>{r.status}</td>
              <td className="action-icons">
                <FaEye className="icon view-icon" style={{ marginRight: 10 }} />
                <FaEdit className="icon edit-icon" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => handleEdit(r)} />
                <FaTrash className="icon delete-icon" style={{ cursor: "pointer" }} onClick={() => handleDelete(r.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="modal-content" style={{ background: "#fff", padding: "20px", width: "400px", borderRadius: "8px" }}>
            <h2>{editingId ? "Edit Request" : "Add New Request"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Issue</label>
              <input
                type="text"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <label>Assigned To</label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <label>Status</label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "20px" }}
              />

              <div className="modal-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update" : "Add"}
                </button>
                <button type="button" className="cancel-button" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequest;
