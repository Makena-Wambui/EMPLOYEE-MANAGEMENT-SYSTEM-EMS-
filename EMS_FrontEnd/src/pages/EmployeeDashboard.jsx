import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  // The EmployeeDashboard component is responsible for rendering the employee dashboard.

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        {" "}
        {/* Add a flex-1 class to the div to take up the remaining space */}
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
