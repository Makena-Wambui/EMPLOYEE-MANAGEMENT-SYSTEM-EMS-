import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { getEmployees } from "../../utils/EmployeeHelper";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  }); // Define a state variable to store the employee
  const navigate = useNavigate(); // Get the navigate function from the useNavigate
  //const { id } = useParams(); // Get the id from the URL params
  const [departments, setDepartments] = useState(null); // Define a state variable to store the departments
  const [employees, setEmployees] = useState([]); // Define a state variable to store the employees

  const handleDepartment = async (e) => {
    const employees = await getEmployees(e.target.value); // Fetch the employees

    setEmployees(employees); // Set the employees state variable with the fetched employees
  };

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments(); // Fetch the departments
      setDepartments(departments); // Set the departments state variable with the fetched departments
    };
    getDepartments(); // Call the getDepartments function to fetch the departments
  }, []);

  /*

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
  */

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the target
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(
        `https://employee-management-system-ems-backend.vercel.app/api/salary/add/`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a POST request to the /api/salary/add endpoint
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
      {departments ? (
        <div className="max-w-3xl mx-auto mt-10 bg-yellow-500 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  onChange={handleDepartment}
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="basic salary"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              {/* Allowances*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="allowances"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="deductions"
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-md w-full mt-6 flex justify-center"
              >
                Add Salary
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

export default Add;
