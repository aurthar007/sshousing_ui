import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const BillingAndPayment = () => {
  const [billings, setBillings] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [flat, setFlat] = useState("");
  const [rentStatus, setRentStatus] = useState("");
  const [serviceFees, setServiceFees] = useState("");
  const [dues, setDues] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    getAllBillings();
  }, []);

  const getAllBillings = () => {
    axios
      .get("https://localhost:7252/api/Billing")
      .then((res) => setBillings(res.data))
      .catch((err) => console.error("Error fetching billing data:", err));
  };

  const addOrUpdateBilling = (e) => {
    e.preventDefault();
    const url = isEditing
      ? `https://localhost:7252/api/Billing/${id}`
      : "https://localhost:7252/api/Billing";

    const method = isEditing ? axios.put : axios.post;

    method(url, { id, name, flat, rentStatus, serviceFees, dues })
      .then(() => {
        getAllBillings();
        resetForm();
      })
      .catch((err) => console.error("Error saving billing data:", err));
  };

  const deleteBilling = (billingId) => {
    if (window.confirm("Are you sure you want to delete this billing record?")) {
      axios
        .delete(`https://localhost:7252/api/Billing/${billingId}`)
        .then(() => getAllBillings())
        .catch((err) => console.error("Error deleting billing data:", err));
    }
  };

  const viewBilling = (billing) => {
    fillForm(billing);
    setIsViewing(true);
    setIsEditing(false);
    setShowModal(true);
  };

  const editBilling = (billing) => {
    fillForm(billing);
    setIsEditing(true);
    setIsViewing(false);
    setShowModal(true);
  };

  const fillForm = (data) => {
    setId(data.id);
    setName(data.name);
    setFlat(data.flat);
    setRentStatus(data.rentStatus);
    setServiceFees(data.serviceFees);
    setDues(data.dues);
  };

  const resetForm = () => {
    setId(0);
    setName("");
    setFlat("");
    setRentStatus("");
    setServiceFees("");
    setDues("");
    setShowModal(false);
    setIsEditing(false);
    setIsViewing(false);
  };

  return (
    <div>
      <h2>Billing & Payment Management</h2>
      <button
        className="add-country-button"
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
      >
        + Add Billing
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Flat</th>
            <th>Rent Status</th>
            <th>Service Fees</th>
            <th>Dues</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.flat}</td>
              <td>{b.rentStatus}</td>
              <td>{b.serviceFees}</td>
              <td>{b.dues}</td>
              <td className="action-icons">
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => viewBilling(b)}
                />
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => editBilling(b)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => deleteBilling(b.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {isViewing
                ? "View Billing"
                : isEditing
                ? "Edit Billing"
                : "Add New Billing"}
            </h2>
            <form onSubmit={addOrUpdateBilling}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={isViewing}
                required
              />
              <label>Flat</label>
              <input
                type="text"
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
                readOnly={isViewing}
                required
              />
              <label>Rent Status</label>
              <input
                type="text"
                value={rentStatus}
                onChange={(e) => setRentStatus(e.target.value)}
                readOnly={isViewing}
                required
              />
              <label>Service Fees</label>
              <input
                type="number"
                value={serviceFees}
                onChange={(e) => setServiceFees(e.target.value)}
                readOnly={isViewing}
                required
              />
              <label>Dues</label>
              <input
                type="number"
                value={dues}
                onChange={(e) => setDues(e.target.value)}
                readOnly={isViewing}
                required
              />
              <div className="modal-buttons">
                {!isViewing && (
                  <button type="submit" className="submit-button">
                    {isEditing ? "Update Billing" : "Add Billing"}
                  </button>
                )}
                <button type="button" className="cancel-button" onClick={resetForm}>
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
