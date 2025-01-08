import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// This component is used to add a new leave request to the system.
const Add = () => {
  const { user } = useAuth(); // Get the user details from the context

  const [leave, setLeave] = useState({
    userId: user._id,
  }); // State to store the leave details

  const navigate = useNavigate(); // Get the navigate function from the hook

  const handleChange = (e) => {
    // get name and value from the input field
    const { name, value } = e.target;

    setLeave((prev) => ({
      ...prev,
      [name]: value,
    })); // Update the state with the new value
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    /*console.log("Leave:", leave);
    console.log("Token:", localStorage.getItem("token"));
    console.log("User:", user); */
    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a POST request to the /api/leave/add endpoint
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`); // Redirect to the leaves page
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Log the error message
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request For Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Leave Type
            </label>

            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="casual">Casual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="annual">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Reason
            </label>
            <textarea
              name="reason"
              placeholder="Reason for leave"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 bg-white rounded-md"
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-900 text-white font-bold px-4 py-2 rounded-lg"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
