import React from "react";
import "../../App.css";

const IncomeSummary = () => {
  // Example static data
  const incomeData = [
    { month: "January", rent: 25000, maintenance: 5000 },
    { month: "February", rent: 24000, maintenance: 5200 },
    { month: "March", rent: 27000, maintenance: 4800 },
  ];

  const totalRent = incomeData.reduce((acc, curr) => acc + curr.rent, 0);
  const totalMaintenance = incomeData.reduce((acc, curr) => acc + curr.maintenance, 0);
  const totalIncome = totalRent + totalMaintenance;

  return (
    <div className="page-container">
      <h2>Income Summary</h2>
      <p>Monthly income from rent and maintenance fees.</p>

      <table className="income-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Rent</th>
            <th>Maintenance</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>₹{item.rent}</td>
              <td>₹{item.maintenance}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>₹{totalRent}</strong></td>
            <td><strong>₹{totalMaintenance}</strong></td>
          </tr>
          <tr>
            <td colSpan="3"><strong>Total Income: ₹{totalIncome}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default IncomeSummary;
