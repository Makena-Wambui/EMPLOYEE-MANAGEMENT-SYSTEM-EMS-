import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// In the Add component, we are creating a form to add a new employee to the system.
const Add = () => {
  const [departments, setDepartments] = useState([]); // Initialize the departments state variable with an empty array
  const [isLoading, setIsLoading] = useState(true); // Add a loading state variable to show a loading message
  const [formData, setFormData] = useState({}); // Define a state variable to store the form data
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const fetchedDepartments = await fetchDepartments();
        setDepartments(fetchedDepartments || []); // Fallback to an empty array if no data
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setIsLoading(false); // Stop loading when data is fetched
      }
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target; // Destructure the name, value, and files from the target

    if (name === "image") {
      // If the name is image, set the form data with the file
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      // Otherwise, set the form data with the name and value
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formDataObj = new FormData(); // Create a new FormData object

    Object.keys(formData).forEach((key) => {
      // Loop through the form data
      formDataObj.append(key, formData[key]); // Append the key and value to the formDataObj
    });

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Make a POST request to the server to add a new employee

      if (response.data.success) {
        navigate("/admin-dashboard/employees"); // Redirect to the employee list page
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.error("Error response:", error.response); // Log the full error response
        console.error("Error message:", error.message); // Log the error message
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-yellow-500 p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : departments.length > 0 ? (
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
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Date Of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                placeholder="Date Of Birth"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                onChange={handleChange}
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                onChange={handleChange}
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
                placeholder="Designation"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                onChange={handleChange}
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

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="********"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                placeholder="Upload Image"
                className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md w-full mt-6"
            >
              Add Employee
            </button>
          </div>
        </form>
      ) : (
        <div>There are no records to display.</div>
      )}
    </div>
  );
};

export default Add;
