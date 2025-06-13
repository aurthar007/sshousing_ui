import { Link, Outlet } from 'react-router-dom';
import '../../App.css';

const MainLayout = () => {
  return (
    <div className="main-container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
          <Link className="navbar-brand fw-bold" to="/">SSHousing Management System</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">Service</Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="main-content p-4">
        <Outlet />
      </main>

      <footer className="footer text-center py-3 bg-light">
        © 2025 Main App
      </footer>
    </div>
  );
};

export default MainLayout;
