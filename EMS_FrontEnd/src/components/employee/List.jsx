import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import axios from "axios";
import DataTable from "react-data-table-component";

// List component to display the list of employees*/
const List = () => {
  const [employees, setEmployees] = useState([]); // Define a state variable to store the employees
  const [empLoading, setEmpLoading] = useState(false); // Define a state variable to store the loading state of the employees
  const [filteredEmployee, setFilteredEmployee] = useState([]); // Define a state variable to store the filtered employees

  useEffect(() => {
    const fetchEmployees = async () => {
      // Fetch the departments from the backend
      setEmpLoading(true); // Set the loading state to true
      try {
        const response = await axios.get(
          "https://employee-management-system-ems-backend.vercel.app/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Make a GET request to the /api/employee endpoint

        if (response.data.success) {
          let s_no = 1; // Initialize the serial number
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            s_no: s_no++, // Increment the serial number
            dep_name: emp.department.dep_name, // Get the department name
            name: emp.userId.name, // Get the employee name
            dob: new Date(emp.dob).toLocaleDateString(), // Get the employee date of birth
            profileImage: (
              <img
                width={40}
                src={`https://employee-management-system-ems-backend.vercel.app/${emp.userId.profileImage}`}
                className="rounded-full"
              />
            ), // Get the employee profile image
            actions: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(data); // Set the employees state variable with the fetched employees
          setFilteredEmployee(data); // Set the filtered employees state variable with the fetched employees
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Log the error message
        }
      } finally {
        setEmpLoading(false); // Set the loading state to false
      }
    };
    fetchEmployees(); // Call the fetchDepartments function to fetch the departments
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Get the search value
    const filteredData = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchValue)
    ); // Filter the employees based on the search value
    setFilteredEmployee(filteredData); // Set the filtered employees state variable with the filtered data
  };
  return (
    <div className="p-5">
      <div className="p-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Employees</h3>
        </div>

        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Emp Name"
            className="px-4 py-0.5 border"
            onChange={handleFilter}
          />
          <Link
            to="/admin-dashboard/add-employee"
            className="px-4 py-1 bg-teal-500 rounded text-white"
          >
            Add New Employee
          </Link>
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={filteredEmployee} pagination />
        </div>
      </div>
    </div>
  );
};
export default List;
