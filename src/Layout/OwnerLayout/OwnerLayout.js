import React from 'react';
import '../../App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';
import SideBar from '../MainLayout/SideBar';

const OwnerLayout = () => {
  const location = useLocation();
  const isAtOwnerRoot = location.pathname === "/owner";

  return (
    <div className="owner-dashboard-wrapper">
      <Header />
      <div className="owner-dashboard-body">
        <SideBar />
        <main className="owner-main-content">
          {isAtOwnerRoot ? (
            <div className="owner-welcome-section">
              <h1>🏡 Welcome to the Owner Dashboard</h1>
              <p>Manage your society tasks like property info, bills, and more.</p>
              <div className="owner-cards-container">
                <div className="owner-card">
                  <h3>🔧 Maintenance</h3>
                  <p>View & raise requests</p>
                </div>
                <div className="owner-card">
                  <h3>💬 Message Board</h3>
                  <p>Post and read announcements</p>
                </div>
                <div className="owner-card">
                  <h3>📄 My Bills</h3>
                  <p>Check and pay dues</p>
                </div>
              </div>
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

export default OwnerLayout;
