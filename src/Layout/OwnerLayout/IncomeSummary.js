import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";

const IncomeSummary = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, month: "", rent: "", maintenance: "" });
  const apiUrl = "https://localhost:7252/api/Income";

  // Fetch all records
  const fetchIncome = () => {
    axios.get(apiUrl)
      .then(res => setIncomeData(res.data))
      .catch(err => console.error("Error fetching data", err));
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  // Handle modal input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (item = null) => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ id: 0, month: "", rent: "", maintenance: "" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ id: 0, month: "", rent: "", maintenance: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      month: formData.month,
      rent: parseFloat(formData.rent),
      maintenance: parseFloat(formData.maintenance),
    };

    if (formData.id) {
      axios.put(`${apiUrl}/${formData.id}`, { id: formData.id, ...payload })
        .then(() => {
          fetchIncome();
          closeModal();
        });
    } else {
      axios.post(apiUrl, payload)
        .then(() => {
          fetchIncome();
          closeModal();
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`${apiUrl}/${id}`)
        .then(() => fetchIncome());
    }
  };

  const totalRent = incomeData.reduce((acc, curr) => acc + curr.rent, 0);
  const totalMaintenance = incomeData.reduce((acc, curr) => acc + curr.maintenance, 0);
  const totalIncome = totalRent + totalMaintenance;

  return (
    <div className="page-container">
      <h2>Income Summary</h2>
      <button onClick={() => openModal()}>Add Income</button>

      <table className="income-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Rent</th>
            <th>Maintenance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((item) => (
            <tr key={item.id}>
              <td>{item.month}</td>
              <td>₹{item.rent}</td>
              <td>₹{item.maintenance}</td>
              <td>
                <button onClick={() => openModal(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>₹{totalRent}</strong></td>
            <td><strong>₹{totalMaintenance}</strong></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4"><strong>Total Income: ₹{totalIncome}</strong></td>
          </tr>
        </tfoot>
      </table>

      {/* Modal Popup */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{formData.id ? "Edit Income" : "Add Income"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="month"
                placeholder="Month"
                value={formData.month}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="rent"
                placeholder="Rent"
                value={formData.rent}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="maintenance"
                placeholder="Maintenance"
                value={formData.maintenance}
                onChange={handleChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{formData.id ? "Update" : "Add"}</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeSummary;
