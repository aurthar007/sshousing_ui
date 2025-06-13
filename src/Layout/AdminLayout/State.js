 import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const State = () => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewState, setViewState] = useState(null);

  const baseURL = "https://localhost:7252/api"; // Correct base URL

  useEffect(() => {
    getAllState();
    getAllCountry();
  }, []);

  const getAllState = () => {
    axios
      .get(`${baseURL}/State/GetAllState`)
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error fetching states:", err));
  };

  const getAllCountry = () => {
    axios
      .get(`${baseURL}/Country/GetAllCountry`)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stateData = {
      id: editingId || 0,
      name,
      countryId: parseInt(countryId),
    };

    if (editingId) {
      axios
        .put(`${baseURL}/State/UpdateState/${editingId}`, stateData)
        .then(() => {
          resetForm();
          getAllState();
        })
        .catch((err) => console.error("Error updating state:", err));
    } else {
      axios
        .post(`${baseURL}/State/AddState`, stateData)
        .then(() => {
          resetForm();
          getAllState();
        })
        .catch((err) => console.error("Error adding state:", err));
    }
  };

  const handleEdit = (state) => {
    setName(state.name);
    setCountryId(state.countryId);
    setEditingId(state.id);
    setShowModal(true);
  };

  const handleView = (state) => {
    setViewState(state);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      axios
        .delete(`${baseURL}/State/DeleteState/${id}`)
        .then(() => getAllState())
        .catch((err) => console.error("Error deleting state:", err));
    }
  };

  const resetForm = () => {
    setName("");
    setCountryId("");
    setEditingId(null);
    setViewState(null);
    setShowModal(false);
  };

  const isFormValid = () => name.trim() !== "" && countryId !== "";

  return (
    <div>
      <button className="add-country-button" onClick={() => setShowModal(true)}>
        + Add State
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {states.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>
                {
                  countries.find((c) => c.id === s.countryId)?.name ||
                  "Unknown Country"
                }
              </td>
              <td>{s.name}</td>
              <td className="action-icons">
                <FaEdit className="icon edit-icon" title="Edit" onClick={() => handleEdit(s)} />
                <FaEye className="icon view-icon" title="View" onClick={() => handleView(s)} />
                <FaTrash className="icon delete-icon" title="Delete" onClick={() => handleDelete(s.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (viewState ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>View State</h2>
            <p><strong>State Name:</strong> {viewState.name}</p>
            <p><strong>Country Name:</strong> {countries.find(c => c.id === viewState.countryId)?.name || "Unknown Country"}</p>
            <div className="modal-buttons">
              <button onClick={resetForm}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingId ? "Edit State" : "Add New State"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Select Country</label>
              <select value={countryId} onChange={(e) => setCountryId(e.target.value)} required>
                <option value="" disabled>-- Select Country --</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <label>State Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter state name"
                required
              />
              <div className="modal-buttons">
                <button type="submit" disabled={!isFormValid()}>
                  {editingId ? "Update State" : "Add State"}
                </button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default State;
