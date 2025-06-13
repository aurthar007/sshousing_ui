 import React from "react";
import "../../App.css";

const ViewPropertiesOwned = () => {
  // Example static data (replace with API data later)
  const ownedProperties = [
    {
      id: 1,
      name: "Sunshine Apartments",
      flat: "A-101",
      status: "Occupied",
    },
    {
      id: 2,
      name: "Palm Residency",
      flat: "B-202",
      status: "Vacant",
    },
  ];

  return (
    <div className="page-container">
      <h2>My Properties</h2>
      <p>View all the properties you own in the society.</p>

      <div className="properties-section">
        {ownedProperties.length > 0 ? (
          <ul className="properties-list">
            {ownedProperties.map((property) => (
              <li key={property.id} className="property-card">
                <h3>{property.name}</h3>
                <p><strong>Flat:</strong> {property.flat}</p>
                <p><strong>Status:</strong> {property.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You do not currently own any properties.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPropertiesOwned;
