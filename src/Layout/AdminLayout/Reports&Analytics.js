import React from "react";
import { FaUsers, FaBuilding, FaMoneyBill, FaTools } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "../../App.css";

// Simulated data
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4000 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 4500 },
];

const occupancyData = [
  { name: "Occupied", value: 63 },
  { name: "Vacant", value: 25 },
];

const complaintData = [
  { name: "Resolved", value: 42 },
  { name: "Open", value: 8 },
];

const COLORS = ["#00C49F", "#FF8042"];

const ReportsAndAnalytics = () => {
  return (
    <div className="page-container" style={{ padding: "20px" }}>
      <h2>Reports & Analytics</h2>
      <p>View revenue, occupancy, and complaints statistics.</p>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <FaUsers size={32} />
          <div>
            <h4>Total Users</h4>
            <p>120</p>
          </div>
        </div>
        <div className="card">
          <FaBuilding size={32} />
          <div>
            <h4>Total Properties</h4>
            <p>100</p>
          </div>
        </div>
        <div className="card">
          <FaMoneyBill size={32} />
          <div>
            <h4>Monthly Revenue</h4>
            <p>₹1.2L</p>
          </div>
        </div>
        <div className="card">
          <FaTools size={32} />
          <div>
            <h4>Open Complaints</h4>
            <p>8</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "40px" }}>
        {/* Revenue Bar Chart */}
        <div>
          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Pie Chart */}
        <div>
          <h3>Occupancy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={occupancyData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Complaints Pie Chart */}
        <div>
          <h3>Complaints</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complaintData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {complaintData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
