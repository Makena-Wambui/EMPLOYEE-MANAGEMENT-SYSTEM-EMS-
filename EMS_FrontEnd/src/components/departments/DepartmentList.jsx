import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"; // Import the DataTable component from the react-data-table-component library to display the list of departments
import { columns } from "../../utils/DepartmentHelper"; // Import the columns from the DepartmentHelper file
import { useEffect } from "react";
import axios from "axios"; // Import axios to make HTTP requests to the backend
import { useState } from "react"; // Import the useState hook from React to define a state variable
import { DepartmentButtons } from "../../utils/DepartmentHelper"; // Import the DepartmentButtons component from the DepartmentHelper file

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]); // Define a state variable to store the departments
  const [depLoading, setDepLoading] = useState(false); // Define a state variable to store the loading state of the departments
  const [filteredDepartments, setFilteredDepartments] = useState([]); // Define a state variable to store the filtered departments
  const [searchValue, setSearchValue] = useState(""); // Search value state

  const onDepartmentDelete = () => {
    fetchDepartments(); // Call the fetchDepartments function to fetch the departments after deleting a department
  };

  const fetchDepartments = async () => {
    // Fetch the departments from the backend
    setDepLoading(true); // Set the loading state to true
    try {
      const response = await axios.get(
        "https://employee-management-system-ems-backend.vercel.app/api/department/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a GET request to the /api/department endpoint
      if (response.data.success) {
        console.log(response.data);
        let s_no = 1; // Initialize the serial number
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          s_no: s_no++, // Increment the serial number
          dep_name: dep.dep_name, // Get the department name
          actions: (
            <DepartmentButtons
              DepId={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data); // Set the departments state variable with the fetched departments
        setFilteredDepartments(data); // Set the filtered departments state variable with the fetched departments
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Log the error message
      }
    } finally {
      setDepLoading(false); // Set the loading state to false
    }
  };
  useEffect(() => {
    fetchDepartments(); // Call the fetchDepartments function to fetch the departments when the component mounts
  }, []);

  const filterDepartments = (e) => {
    const value = e.target.value.toLowerCase(); // Get the search value
    setSearchValue(value); // Set the search value state variable
    const filteredData = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(value)
    ); // Filter the departments based on the search value
    setFilteredDepartments(filteredData); // Set the departments state variable with the filtered departments
  };

  return (
    // Return the DepartmentList component
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by Dept. Name"
              className="px-4 py-0.5 border"
              value={searchValue}
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-500 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination // Enable pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
