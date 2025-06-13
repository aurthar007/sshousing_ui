import { NavLink } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import {
  FaGlobe,
  FaFlag,
  FaMapMarkedAlt,
  FaUserShield,
  FaUserTag,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaTools,
  FaGavel,
  FaChartBar,
  FaHome,
  FaFileUpload,
  FaComments // ✅ Added for Message Board
} from "react-icons/fa";
import "../../App.css";

const SideBar = () => {
  const role = useAuthStore((state) => state.role);

  const getLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active-link" : "sidebar-link";

  return (
    <aside className="sidebar">
      <ul>
        {/* Admin Links */}
        {role === "Admin" && (
          <>
            <li className="sidebar-item">
              <NavLink to="/admin/assignrole" className={getLinkClass}>
                <FaUserTag />
                <span style={{ marginLeft: "8px" }}>Assign Role</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/role" className={getLinkClass}>
                <FaUserShield />
                <span style={{ marginLeft: "8px" }}>Role</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/country" className={getLinkClass}>
                <FaGlobe />
                <span style={{ marginLeft: "8px" }}>Country</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/state" className={getLinkClass}>
                <FaFlag />
                <span style={{ marginLeft: "8px" }}>State</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/district" className={getLinkClass}>
                <FaMapMarkedAlt />
                <span style={{ marginLeft: "8px" }}>District</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/manageproperties" className={getLinkClass}>
                <FaBuilding />
                <span style={{ marginLeft: "8px" }}>Manage Properties</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/manageusers" className={getLinkClass}>
                <FaUsers />
                <span style={{ marginLeft: "8px" }}>Manage Users</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/billingandpayment" className={getLinkClass}>
                <FaMoneyBillWave />
                <span style={{ marginLeft: "8px" }}>Billing & Payments</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/maintenancerequests" className={getLinkClass}>
                <FaTools />
                <span style={{ marginLeft: "8px" }}>Maintenance Requests</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/societyrulesandnotices" className={getLinkClass}>
                <FaGavel />
                <span style={{ marginLeft: "8px" }}>Society Rules & Notices</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/reportsandanalytics" className={getLinkClass}>
                <FaChartBar />
                <span style={{ marginLeft: "8px" }}>Reports & Analytics</span>
              </NavLink>
            </li>
          </>
        )}

        {/* Owner Links */}
        {role === "Owner" && (
          <>
            <li className="sidebar-item">
              <NavLink to="/owner/viewproperties" className={getLinkClass}>
                <FaHome />
                <span style={{ marginLeft: "8px" }}>View Properties Owned</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/owner/tenantstatus" className={getLinkClass}>
                <FaUsers />
                <span style={{ marginLeft: "8px" }}>Tenant Status</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/owner/incomesummary" className={getLinkClass}>
                <FaMoneyBillWave />
                <span style={{ marginLeft: "8px" }}>Income Summary</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/owner/documentuploads" className={getLinkClass}>
                <FaFileUpload />
                <span style={{ marginLeft: "8px" }}>Document Uploads</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/owner/messageboard" className={getLinkClass}>
                <FaComments />
                <span style={{ marginLeft: "8px" }}>Message Board</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SideBar;