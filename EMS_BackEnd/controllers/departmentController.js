import Department from "../models/department.js"; // Import the Department model

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find(); // Find all the departments in the database

    return res.status(200).json({
      success: true,
      departments,
    }); // Return a success response with status code 200
  } catch (error) {
    res.status(500).json({ error: "Server error in get departments" }); // Return an error response with status code 500
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body; // Destructure the department name and description from the request body

    const newDep = await Department({ dep_name, description }); // Create a new department with the department name and description and save it to the database

    await newDep.save(); // Save the new department to the database

    return res.status(200).json({
      success: true,
      department: newDep,
      message: "Department added successfully",
    }); // Return a success response with status code 200
  } catch (error) {
    res.status(500).json({ error: "Server error in add department" }); // Return an error response with status code 500
  }
};

export { addDepartment, getDepartments }; // Export the addDepartment and getDepartments functions
