// This component is the sidebar of the employee dashboard

import { NavLink } from "react-router-dom"; // Import the NavLink component from react-router-dom for navigation on the sidebar.
import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa"; // Import the FaTachometerAlt icon from react-icons/fa for the dashboard icons.
import { useAuth } from "../../context/authContext"; // Import the useAuth hook from the auth context for accessing the user object.

const Sidebar = () => {
  const { user } = useAuth(); // Get the user object from the auth context.
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      {/* Design the Sidebar */}
      <div className="bg-teal-700 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-aguDisplay">Employee MS</h3>
      </div>

      <div className="px-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-600" : " "
            } flex items-center space-x-4 py-3 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`} // Add the user ID to the profile route
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-600" : " "
            } flex items-center space-x-4 py-3 px-4 rounded`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`} // Add the user ID to the leaves route
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-600" : " "
            } flex items-center space-x-4 py-3 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`} // Add the user ID to the salary route
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-600" : " "
            } flex items-center space-x-4 py-3 px-4 rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-600" : " "
            } flex items-center space-x-4 py-3 px-4 rounded`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
