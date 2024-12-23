import axios from "axios";

export const fetchDepartments = async () => {
  let departments;
  // Fetch the departments from the backend
  try {
    const response = await axios.get("http://localhost:5000/api/department/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); // Make a GET request to the /api/department endpoint
    if (response.data.success) {
      departments = response.data.departments; // Get the departments
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error); // Log the error message
    }
  }
  return departments;
};
