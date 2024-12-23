import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  /* Define columns for the department table */
  {
    name: "S No.",
    selector: (row) => row.s_no, // Define the selector to get the serial number of the department
    // sortable: true,
    width: "70px", // Set the width of the column
  },
  {
    name: "Name",
    selector: (row) => row.name, // Define the selector to get the employee name
    sortable: true, // Enable sorting for the employee name
    width: "120px",
  },

  {
    name: "Image",
    selector: (row) => row.profileImage, // Define the selector to get the profile image of the employee
    width: "120px",
  },

  {
    name: "Department",
    selector: (row) => row.dep_name, // Define the selector to get the department name
    width: "120px",
  },

  {
    name: "DOB",
    selector: (row) => row.dob, // Define the selector to get the department name
    sortable: true, // Enable sorting for the department name
    width: "200px",
  },
  {
    name: "Actions",
    selector: (row) => row.actions, // Define the selector to get the actions for the department
    center: true, // Center align the content
  },
];

export const fetchDepartments = async () => {
  let departments;
  // Fetch the departments from the backend
  try {
    const response = await axios.get("http://localhost:5000/api/department/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); // Make a GET request to the /api/department endpoint
    if (response.data.success) {
      departments = response.data.departments; // Get the departments
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error); // Log the error message
    }
  }
  return departments;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  // Return the buttons for the employee actions
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-600 rounded text-white mr-2"
        // onClick={() => navigate(`/admin-dashboard/department/${Id}`)} // Navigate to the department details page
      >
        View
      </button>
      <button className="px-3 py-1 bg-yellow-500 rounded text-white">
        Edit
      </button>

      <button className="px-3 py-1 bg-green-600 rounded text-white">
        Salary
      </button>

      <button className="px-3 py-1 bg-orange-600 rounded text-white">
        Leave
      </button>
    </div>
  );
};
