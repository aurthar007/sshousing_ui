import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useAuthStore from "./Store/useAuthStore";

// Main layout and public pages
import MainLayout from "./Layout/MainLayout/MainLayout";
import Home from "./Layout/MainLayout/Home";
import About from "./Layout/MainLayout/About";
import Service from "./Layout/MainLayout/Service";
import Login from "./Layout/MainLayout/Login";
import Register from "./Layout/MainLayout/Register";

// Admin and Owner layouts
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import OwnerLayout from "./Layout/OwnerLayout/OwnerLayout";

// Admin pages
import Country from "./Layout/AdminLayout/Country";
import State from "./Layout/AdminLayout/State";
import District from "./Layout/AdminLayout/District";
import Role from "./Layout/AdminLayout/Role";
import AssignRole from "./Layout/AdminLayout/AssignRole";
import ManageProperties from "./Layout/AdminLayout/ManageProperties";
import ManageUsers from "./Layout/AdminLayout/ManageUsers";
import BillingAndPayment from "./Layout/AdminLayout/BillingandPayments";
import MaintenanceRequests from "./Layout/AdminLayout/MaintenanceRequests";
import SocietyRulesandNotices from "./Layout/AdminLayout/SocietyRulesandNotices";
import ReportsAndAnalytics from "./Layout/AdminLayout/Reports&Analytics";

// Owner pages
import ViewPropertiesOwned from "./Layout/OwnerLayout/ViewPropertiesOwned";
import TenantStatus from "./Layout/OwnerLayout/TenantStatus";
import IncomeSummary from "./Layout/OwnerLayout/IncomeSummary";
import DocumentUploads from "./Layout/OwnerLayout/DocumentUploads";
import MessageBoard from "./Layout/OwnerLayout/MessageBoard";

// Route guards
const AdminRoute = ({ children }) => {
  const { user, role } = useAuthStore();
  return user && role === "Admin" ? children : <Navigate to="/login" replace />;
};

const OwnerRoute = ({ children }) => {
  const { user, role } = useAuthStore();
  return user && role === "Owner" ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="country" element={<Country />} />
          <Route path="state" element={<State />} />
          <Route path="district" element={<District />} />
          <Route path="role" element={<Role />} />
          <Route path="assignrole" element={<AssignRole />} />
          <Route path="manageproperties" element={<ManageProperties />} />
          <Route path="manageusers" element={<ManageUsers />} />
          <Route path="billingandpayment" element={<BillingAndPayment />} />
          <Route path="maintenancerequests" element={<MaintenanceRequests />} />
          <Route path="societyrulesandnotices" element={<SocietyRulesandNotices />} />
          <Route path="reportsandanalytics" element={<ReportsAndAnalytics />} />
        </Route>

        {/* Owner routes */}
        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <OwnerLayout />
            </OwnerRoute>
          }
        >
          <Route path="viewproperties" element={<ViewPropertiesOwned />} />
          <Route path="tenantstatus" element={<TenantStatus />} />
          <Route path="incomesummary" element={<IncomeSummary />} />
          <Route path="documentuploads" element={<DocumentUploads />} />
          <Route path="messageboard" element={<MessageBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
