import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  /* Define columns for the department table */
  {
    name: "S No.",
    selector: (row) => row.s_no, // Define the selector to get the serial number of the department
    // sortable: true,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name, // Define the selector to get the department name
    sortable: true, // Enable sorting for the department name
  },
  {
    name: "Actions",
    selector: (row) => row.actions, // Define the selector to get the actions for the department
  },
];

export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    ); // Ask for confirmation before deleting the department
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Make a DELETE request to the /api/department endpoint
        if (response.data.success) {
          onDepartmentDelete(); // Call the onDepartmentDelete function to remove the department from the UI
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error); // Log the error message
        }
      }
    }
  };

  // Return the JSX for Edit and Delete buttons
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-600 rounded text-white mr-2"
        onClick={() => navigate(`/admin-dashboard/department/${DepId}`)} // Navigate to the department details page
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 rounded text-white"
        onClick={() => handleDelete(DepId)} // Call the handleDelete function to delete the department
      >
        Delete
      </button>
    </div>
  );
};
