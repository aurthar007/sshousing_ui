import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const District = () => {
  const [districts, setDistricts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [districtName, setDistrictName] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewDistrict, setViewDistrict] = useState(null);

  const baseURL = "https://localhost:7252/api";

  useEffect(() => {
    getAllDistricts();
    getAllCountries();
    getAllStates();
  }, []);

  // Fetch all districts
  const getAllDistricts = () => {
    axios
      .get(`${baseURL}/District/GetAllDistrict`)
      .then((res) => setDistricts(res.data))
      .catch((err) => console.error("Error fetching districts:", err));
  };

  // Fetch all countries
  const getAllCountries = () => {
    axios
      .get(`${baseURL}/Country/GetAllCountry`)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  };

  // Fetch all states (to filter based on country)
  const getAllStates = () => {
    axios
      .get(`${baseURL}/State/GetAllState`)
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error fetching states:", err));
  };

  // Filter states when country changes
  useEffect(() => {
    if (selectedCountryId) {
      const filtered = states.filter(s => s.countryId === parseInt(selectedCountryId));
      setFilteredStates(filtered);
      setSelectedStateId(""); // reset state selection when country changes
    } else {
      setFilteredStates([]);
      setSelectedStateId("");
    }
  }, [selectedCountryId, states]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const districtData = {
      id: editingId || 0,
      name: districtName,
      countryId: parseInt(selectedCountryId),
      stateId: parseInt(selectedStateId),
    };

    if (editingId) {
      axios
        .put(`${baseURL}/District/UpdateDistrict/${editingId}`, districtData)
        .then(() => {
          resetForm();
          getAllDistricts();
        })
        .catch((err) => console.error("Error updating district:", err));
    } else {
      axios
        .post(`${baseURL}/District/AddDistrict`, districtData)
        .then(() => {
          resetForm();
          getAllDistricts();
        })
        .catch((err) => console.error("Error adding district:", err));
    }
  };

  const handleEdit = (district) => {
    setDistrictName(district.name);
    setSelectedCountryId(district.countryId.toString());
    setSelectedStateId(district.stateId.toString());
    setEditingId(district.id);
    setShowModal(true);
  };

  const handleView = (district) => {
    setViewDistrict(district);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this district?")) {
      axios
        .delete(`${baseURL}/District/DeleteDistrict/${id}`)
        .then(() => getAllDistricts())
        .catch((err) => console.error("Error deleting district:", err));
    }
  };

  const resetForm = () => {
    setDistrictName("");
    setSelectedCountryId("");
    setSelectedStateId("");
    setEditingId(null);
    setViewDistrict(null);
    setShowModal(false);
  };

  const isFormValid = () => 
    districtName.trim() !== "" && selectedCountryId !== "" && selectedStateId !== "";

  return (
    <div>
      <button className="add-district-button" onClick={() => setShowModal(true)}>
        + Add District
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>District Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{countries.find(c => c.id === d.countryId)?.name || "Unknown Country"}</td>
              <td>{states.find(s => s.id === d.stateId)?.name || "Unknown State"}</td>
              <td>{d.name}</td>
              <td className="action-icons">
                <FaEdit className="icon edit-icon" title="Edit" onClick={() => handleEdit(d)} />
                <FaEye className="icon view-icon" title="View" onClick={() => handleView(d)} />
                <FaTrash className="icon delete-icon" title="Delete" onClick={() => handleDelete(d.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {viewDistrict ? (
              <>
                <h2>View District</h2>
                <p><strong>District Name:</strong> {viewDistrict.name}</p>
                <p><strong>Country Name:</strong> {countries.find(c => c.id === viewDistrict.countryId)?.name || "Unknown Country"}</p>
                <p><strong>State Name:</strong> {states.find(s => s.id === viewDistrict.stateId)?.name || "Unknown State"}</p>
                <div className="modal-buttons">
                  <button onClick={resetForm}>Close</button>
                </div>
              </>
            ) : (
              <>
                <h2>{editingId ? "Edit District" : "Add New District"}</h2>
                <form onSubmit={handleSubmit}>
                  <label>Select Country</label>
                  <select
                    value={selectedCountryId}
                    onChange={(e) => setSelectedCountryId(e.target.value)}
                    required
                  >
                    <option value="" disabled>-- Select Country --</option>
                    {countries.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <label>Select State</label>
                  <select
                    value={selectedStateId}
                    onChange={(e) => setSelectedStateId(e.target.value)}
                    required
                    disabled={!selectedCountryId}
                  >
                    <option value="" disabled>-- Select State --</option>
                    {filteredStates.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>

                  <label>District Name</label>
                  <input
                    type="text"
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
                    placeholder="Enter district name"
                    required
                  />

                  <div className="modal-buttons">
                    <button type="submit" disabled={!isFormValid()}>
                      {editingId ? "Update District" : "Add District"}
                    </button>
                    <button type="button" onClick={resetForm}>Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default District;
