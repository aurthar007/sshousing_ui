import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";

const Header = () => {
  const { user, role, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <header
      className="dashboard-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        alignItems: "center",
        backgroundColor: "#1f2d3d",
        color: "#fff",
      }}
    >
      <div className="logo" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        SSHOUSING
      </div>

      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FaUserCircle className="icon user-icon" size={24} />
        <span className="username">
          {user?.name ? `${user.name} (${role})` : `Guest (${role || "No Role"})`}
        </span>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="icon-button"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}
        >
          <FaSignOutAlt className="icon" size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
