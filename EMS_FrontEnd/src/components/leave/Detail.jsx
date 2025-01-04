import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// The Detail component is responsible for rendering the details of a leave.
const Detail = () => {
  const { id } = useParams(); // Get the id from the URL
  const [leave, setLeave] = useState(null); // Define a state variable to store the employee

  useEffect(() => {
    const fetchLeave = async () => {
      // Fetch the leave from the backend
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
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

  return (
    <>
      {leave ? (
        <div className="max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
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
                <p className="text-lg font-bold">Status:</p>
                <p className="font-medium">{leave.status}</p>
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
