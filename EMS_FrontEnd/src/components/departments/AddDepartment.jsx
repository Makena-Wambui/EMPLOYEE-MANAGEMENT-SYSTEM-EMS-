import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  // Define the handleChange function to update the department state when the input values change
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target

    setDepartment({ ...department, [name]: value }); // Update the department state with the new value
  };

  // Define the handleSubmit function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Make a POST request to the server to add a new department

      if (response.data.success) {
        navigate(`/admin-dashboard/departments/${_id}`); // Redirect to the department list page
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    /*
    Designed the AddDepartment component to allow users to add a new department to the system.
    */
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
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
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
