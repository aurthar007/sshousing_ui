import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
return (
  <footer className="dashboard-footer">
  &copy; {new Date().getFullYear()} EduPortal. All rights reserved.
</footer>
 );
};

export default Footer;