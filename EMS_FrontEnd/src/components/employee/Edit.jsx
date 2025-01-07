import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  }); // Define a state variable to store the employee
  const navigate = useNavigate(); // Get the navigate function from the useNavigate
  const { id } = useParams(); // Get the id from the URL params
  const [departments, setDepartments] = useState(null); // Define a state variable to store the departments

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments(); // Fetch the departments
      setDepartments(departments); // Set the departments state variable with the fetched departments
    };
    getDepartments(); // Call the getDepartments function to fetch the departments
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      // Fetch the employee from the backend
      try {
        const response = await axios.get(
          `https://employee-management-system-ems-backend.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Make a GET request to the /api/employee/:id endpoint
        if (response.data.success) {
          const employee = response.data.employee; // Get the employee
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          })); // Set the employee state variable with the fetched employee
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Log the error message
        }
      }
    };
    fetchEmployee(); // Call the fetchEmployee function to fetch the employee
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the target
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.put(
        `https://employee-management-system-ems-backend.vercel.app/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a PUT request to the server to update the employee

      if (response.data.success) {
        navigate("/admin-dashboard/employees"); // Redirect to the employee list page
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      {departments && employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-yellow-500 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* Name */}
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  placeholder="Marital Status"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation}
                  placeholder="Designation"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              {/* Salary 
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="Salary"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              */}

              {/* Department */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                  value={employee.department}
                  required
                >
                  {/* Display the departments */}
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-md w-full mt-6 flex justify-center"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;
