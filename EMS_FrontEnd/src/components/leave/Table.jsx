// The Table component is responsible for rendering the table of leaves.
// It fetches the list of leaves from the backend and displays them in a tabular format.
// The component also provides a search functionality to filter the leaves based on their status.
import axios from "axios";
import DataTable from "react-data-table-component"; // Import the DataTable component from the react-data-table-component library
import { useEffect, useState } from "react";
import { LeaveButtons, columns } from "../../utils/LeaveHelper"; // Import the LeaveButtons component from the LeaveHelper file

const Table = () => {
  const [leaves, setLeaves] = useState(null); // Define a state variable to store the leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }); // Make a GET request to the /api/leave endpoint
      console.log(response.data);
      if (response.data.success) {
        // Design the table to display the list of leaves
        let s_no = 1; // Initialize the serial number
        const data = await response.data.data.map((leave) => ({
          _id: leave._id,
          s_no: s_no++, // Increment the serial number
          employeeId: leave.employeeId.employeeId, // Get the employee ID
          name: leave.employeeId.userId.name, // Get the employee name
          leaveType: leave.leaveType, // Get the leave type
          department: leave.employeeId.department.dep_name, // Get the department name
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(), // Calculate the number of days
          status: leave.status, // Get the leave status
          actions: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data); // Set the leaves state variable with the fetched leaves
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Log the error message
      }
    }
  }; // Define a function named fetchLeaves that makes an API call to fetch the list of leaves.

  useEffect(() => {
    fetchLeaves();
  }, []); // Call the fetchLeaves function inside the useEffect hook to fetch the list of leaves when the component is mounted.

  useEffect(() => {
    console.log(leaves);
  }, [leaves]);
  return (
    <>
      {leaves ? (
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Status"
              className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="space-x-3">
              <button className="px-2 py-1 bg-orange-600 text-white hover:bg-orange-800">
                Pending
              </button>
              <button className="px-2 py-1 bg-green-600 text-white hover:bg-green-800">
                Approved
              </button>
              <button className="px-2 py-1 bg-red-600 text-white hover:bg-red-800">
                Rejected
              </button>
            </div>
          </div>
          <DataTable columns={columns} data={leaves} pagination />{" "}
          {/*Render the DataTable component with the columns and data props */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
{
  /* If the leaves state variable is not empty, render the table with the list of leaves. Otherwise, display a loading message. */
}

export default Table;
