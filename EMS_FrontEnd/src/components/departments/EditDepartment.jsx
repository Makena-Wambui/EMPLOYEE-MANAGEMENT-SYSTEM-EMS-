import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate(); // Define the navigate function
  const [department, setDepartment] = useState([]); // Define a state variable to store the departments
  const [depLoading, setDepLoading] = useState(false); // Define a state variable to store the loading state of the departments

  useEffect(() => {
    const fetchDepartments = async () => {
      // Fetch the departments from the backend
      setDepLoading(true); // Set the loading state to true
      try {
        const response = await axios.get(
          `https://employee-management-system-ems-backend.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // Make a GET request to the /api/department endpoint
        if (response.data.success) {
          setDepartment(response.data.department); // Set the departments state variable with the fetched departments
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Log the error message
        }
      } finally {
        setDepLoading(false); // Set the loading state to false
      }
    };
    fetchDepartments(); // Call the fetchDepartments function to fetch the departments
  }, [id]);

  // Define the handleChange function to update the department state when the input values change
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target

    setDepartment({ ...department, [name]: value }); // Update the department state with the new value
  };

  // Define the handleSubmit function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.put(
        `https://employee-management-system-ems-backend.vercel.app/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a PUT request to the server to update the department

      if (response.data.success) {
        navigate("/admin-dashboard/departments"); // Redirect to the department list page
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                onChange={handleChange} // Add the handleChange function to handle the input change event
                value={department.dep_name}
                placeholder="Department Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange} // Add the handleChange function to handle the input change event
                value={department.description}
                placeholder="Description"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
