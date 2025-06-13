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
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        <SideBar /> 
        <main className="main-content">
          {isAtOwnerRoot ? (
            <div className="welcome-message">
              <h1>🏡 Welcome to Owner Dashboard</h1>
              <p>Here you can manage your society-related activities.</p>
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
