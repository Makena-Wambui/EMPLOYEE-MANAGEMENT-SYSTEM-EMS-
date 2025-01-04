import { useNavigate } from "react-router-dom";

// Define the columns for the leave table
export const columns = [
  {
    name: "S.No",
    selector: (row) => row.s_no,
    width: "70px",
  },

  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    width: "150px",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    width: "150px",
  },

  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "150px",
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
  },

  {
    name: "Days",
    selector: (row) => row.days,
    width: "100px",
  },

  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },

  {
    name: "Actions",
    selector: (row) => row.actions,
    center: true,
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate(); // Initialize the navigate function from the useNavigate hook

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`); // Redirect to the view leave page with the leave ID as a parameter
  };

  return (
    <button
      onClick={() => handleView(Id)} // Call the handleView function with the leave ID as an argument
      className="px-4 py-1 bg-blue-600 text-white hover:bg-blue-800 rounded" // Design the view button
    >
      View
    </button>
  );
};
