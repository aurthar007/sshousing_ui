import React from 'react';
import '../../App.css';
import { FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';
import SideBar from '../MainLayout/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const isAtAdminRoot = location.pathname === "/admin";

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        <SideBar />
        <main className="main-content">
          {isAtAdminRoot ? (
            <div className="welcome-message">
              <h1>👋 Welcome to Admin Dashboard</h1>
              <p>You have access to manage all admin features.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
