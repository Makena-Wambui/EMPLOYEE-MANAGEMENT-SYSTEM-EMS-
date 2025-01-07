import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";

const List = () => {
  let sno = 1; // Initialize the serial number
  const { user } = useAuth(); // Get the user details from the context

  const [leaves, setLeaves] = useState([]); // Define a state variable to store the leaves
  const [loading, setLoading] = useState(true); // Define a state variable for loading

  const { id } = useParams(); // Get the employee ID from the URL

  // Define a function to fetch the leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`, // Make a GET request to the /api/leave/:id/:role endpoint
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        setLeaves(response.data.data); // Set the leaves state variable with the data
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Log the error message
      }
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchLeaves(); // Call the fetchLeaves function to fetch the leaves
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Status"
          className="px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="bg-blue-600 text-white px-4 py-1 rounded-lg"
          >
            Add New Leave
          </Link>
        )}{" "}
        {/*Add a condition to check if the user role is employee and display the Add New Leave button */}
      </div>

      <table className="w-full text-sm text-left text-gray-500 mt-8">
        <thead className="text-xs bg-gray-50 text-gray-600 uppercase border border-gray-300">
          <tr>
            <th className="px-6 py-3">S.No</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-3">
                Loading...
              </td>
            </tr>
          ) : leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave._id} className="bg-white border-b">
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-3">
                No leaves found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
