import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false); // new state for view mode

  // Fetch all countries on component mount
  useEffect(() => {
    GetAllCountry();
  }, []);

  const GetAllCountry = () => {
    axios
      .get("https://localhost:7252/api/Country/GetAllCountry")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  };

  const addOrUpdateCountry = (e) => {
    e.preventDefault();

    const url = isEditing
      ? `https://localhost:7252/api/Country/UpdateCountry/${id}`
      : "https://localhost:7252/api/Country/AddCountry";

    const method = isEditing ? axios.put : axios.post;

    method(url, { id, name })
      .then(() => {
        GetAllCountry();
        setShowModal(false);
        setName("");
        setId(0);
        setIsEditing(false);
        setIsViewing(false);
      })
      .catch((err) => {
        console.error("Error saving country:", err);
      });
  };

  const deleteCountry = (countryId) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      axios
        .delete(`https://localhost:7252/api/Country/DeleteCountry/${countryId}`)
        .then(() => {
          GetAllCountry();
        })
        .catch((err) => {
          console.error("Error deleting country:", err);
        });
    }
  };

  const viewCountry = (country) => {
    setId(country.id);
    setName(country.name);
    setIsEditing(false);
    setIsViewing(true);
    setShowModal(true);
  };

  const editCountry = (country) => {
    setId(country.id);
    setName(country.name);
    setIsEditing(true);
    setIsViewing(false);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Manage Country</h2>
      <button
        className="add-country-button"
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          setIsViewing(false);
          setName("");
          setId(0);
        }}
      >
        + Add Country
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
          {countries.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td className="action-icons">
                <FaEye
                  className="icon view-icon"
                  title="View"
                  onClick={() => viewCountry(c)}
                />
                <FaEdit
                  className="icon edit-icon"
                  title="Edit"
                  onClick={() => editCountry(c)}
                />
                <FaTrash
                  className="icon delete-icon"
                  title="Delete"
                  onClick={() => deleteCountry(c.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit/View */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              {isViewing
                ? "View Country"
                : isEditing
                ? "Edit Country"
                : "Add New Country"}
            </h2>
            <form onSubmit={addOrUpdateCountry}>
              <label>Country Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter country name"
                onChange={(e) => setName(e.target.value)}
                readOnly={isViewing}
                required
              />
              <div className="modal-buttons">
                {!isViewing && (
                  <button type="submit" className="submit-button">
                    {isEditing ? "Update Country" : "Add Country"}
                  </button>
                )}
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowModal(false);
                    setName("");
                    setId(0);
                    setIsEditing(false);
                    setIsViewing(false);
                  }}
                >
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

export default Country;
