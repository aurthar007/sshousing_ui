 import React from "react";
import "../../App.css";

const TenantStatus = () => {
  // Example static data (replace with real data from API later)
  const tenants = [
    {
      id: 1,
      name: "John Doe",
      property: "Sunshine Apartments - A-101",
      rentStatus: "Paid",
      maintenanceStatus: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      property: "Palm Residency - B-202",
      rentStatus: "Overdue",
      maintenanceStatus: "Cleared",
    },
  ];

  return (
    <div className="page-container">
      <h2>Tenant Status</h2>
      <p>Monitor rent and maintenance details of your tenants.</p>

      <div className="tenants-section">
        {tenants.length > 0 ? (
          <ul className="tenants-list">
            {tenants.map((tenant) => (
              <li key={tenant.id} className="property-card">
                <h3>{tenant.name}</h3>
                <p><strong>Property:</strong> {tenant.property}</p>
                <p><strong>Rent Status:</strong> {tenant.rentStatus}</p>
                <p><strong>Maintenance:</strong> {tenant.maintenanceStatus}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tenant records found.</p>
        )}
      </div>
    </div>
  );
};

export default TenantStatus;
