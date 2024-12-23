import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
  const { id } = useParams(); // Get the id from the URL
  const [employee, setEmployee] = useState(null); // Define a state variable to store the employee

  useEffect(() => {
    const fetchEmployee = async () => {
      // Fetch the employee from the backend
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Make a GET request to the /api/employee/:id endpoint
        if (response.data.success) {
          setEmployee(response.data.employee); // Set the employee state variable with the fetched employee
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Log the error message
        }
      }
    };
    fetchEmployee(); // Call the fetchEmployee function to fetch the employee
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                className="rounded-full border w-72"
                alt="Profile"
              />
            </div>
            {/* Display the profile image of the employee */}
            <div>
              {/* Display the details of the employee */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Date Of Birth:</p>
                <p className="font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus}</p>
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

export default View;
