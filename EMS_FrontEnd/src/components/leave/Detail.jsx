import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// The Detail component is responsible for rendering the details of a leave.
const Detail = () => {
  const { id } = useParams(); // Get the id from the URL
  const [leave, setLeave] = useState(null); // Define a state variable to store the employee
  const navigate = useNavigate(); // Initialize the navigate function from the useNavigate hook

  useEffect(() => {
    const fetchLeave = async () => {
      // Fetch the leave from the backend
      try {
        const response = await axios.get(
          `https://employee-management-system-ems-backend.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Make a GET request to the /api/leave/detail/:id endpoint

        console.log(response.data.data);

        if (response.data.success) {
          setLeave(response.data.data); // Set  the leave state variable with the fetched leave
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Log the error message
        }
      }
    };
    fetchLeave(); // Call the fetchLeave function to fetch the leave
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://employee-management-system-ems-backend.vercel.app/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a PUT request to the /api/leave/status/:id endpoint

      if (response.data.success) {
        navigate("/admin-dashboard/leaves"); // Redirect to the leaves page
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Log the error message
      }
    }
  }; // Define a function named changeStatus that updates the status of the leave.

  return (
    <>
      {leave ? (
        <div className="max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`https://employee-management-system-ems-backend.vercel.app/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-72"
                alt="Profile"
              />
            </div>
            {/* Display the profile image of the employee */}
            <div>
              {/* Display the details of the employee */}

              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-4">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Actions:" : "Status:"}{" "}
                  {/*Display Actions if the status is Pending */}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-3">
                    <button
                      className="px-2 py-1 bg-green-600 text-white hover:bg-green-800"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white hover:bg-red-800"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Detail;
