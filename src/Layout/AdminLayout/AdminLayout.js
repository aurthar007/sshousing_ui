import React from 'react';
import '../../App.css';
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';
import SideBar from '../MainLayout/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-body">
        <SideBar />
        <main className="main-content" role="main">
          {/* Just render the nested route component */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
