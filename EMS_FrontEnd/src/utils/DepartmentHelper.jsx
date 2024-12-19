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
    //sortable: true,
  },
  {
    name: "Actions",
    selector: (row) => row.actions, // Define the selector to get the actions for the department
  },
];

export const DepartmentButtons = ({ _id }) => {
  /* Define the DepartmentButtons component */
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-600 rounded text-white mr-2"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)} // Navigate to the department details page
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 rounded text-white"
        //onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};
