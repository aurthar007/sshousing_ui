import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Role = () => {
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);

  
  const fetchRoles = () => {
    axios
      .get("https://localhost:7252/api/Role/GetAllRole")
      .then((res) => setRoles(res.data))
      .catch((error) => {
        console.error("Failed to fetch roles:", error);
        alert("Failed to fetch roles");
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Add or update role
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) {
      alert("Role name cannot be empty");
      return;
    }

    setLoading(true);

    if (editingRoleId) {
      // Update role
      axios
        .put(`https://localhost:7252/api/Role/UpdateRole/${editingRoleId}`, {
          id: editingRoleId,
          name: newRoleName.trim(),
        })
        .then(() => {
          setNewRoleName("");
          setEditingRoleId(null);
          setShowModal(false);
          fetchRoles();
        })
        .catch((error) => {
          console.error("Failed to update role:", error);
          alert("Failed to update role");
        })
        .finally(() => setLoading(false));
    } else {
      // Add new role
      axios
        .post("https://localhost:7252/api/Role/AddRole", {
          name: newRoleName.trim(),
        })
        .then(() => {
          setNewRoleName("");
          setShowModal(false);
          fetchRoles();
        })
        .catch((error) => {
          console.error("Failed to add role:", error);
          alert("Failed to add role");
        })
        .finally(() => setLoading(false));
    }
  };

  // Edit role handler
  const handleEdit = (role) => {
    setEditingRoleId(role.id);
    setNewRoleName(role.name);
    setShowModal(true);
  };

  // Delete role handler
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    axios
      .delete(`https://localhost:7252/api/Role/DeleteRole/${id}`)
      .then(() => fetchRoles())
      .catch((error) => {
        console.error("Failed to delete role:", error);
        alert("Failed to delete role");
      });
  };

  return (
    <div>
      <h1>Manage Role</h1>
      <button
        className="add-task-button"
        onClick={() => {
          setEditingRoleId(null);
          setNewRoleName("");
          setShowModal(true);
        }}
      >
        + Add Role
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td className="action-icons">
                <FaEye className="icon view-icon" title="View" />
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => handleEdit(r)}
                  style={{ cursor: "pointer" }}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => handleDelete(r.id)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingRoleId ? "Edit Role" : "Add New Role"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Role Name</label>
              <input
                type="text"
                name="roleName"
                placeholder="Enter role name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                required
                disabled={loading}
              />
              <div className="modal-buttons">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading
                    ? editingRoleId
                      ? "Updating..."
                      : "Adding..."
                    : editingRoleId
                    ? "Update Role"
                    : "Add Role"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRoleId(null);
                    setNewRoleName("");
                  }}
                  disabled={loading}
                >
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

export default Role;
