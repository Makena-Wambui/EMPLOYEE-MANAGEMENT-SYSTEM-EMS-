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

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Get the department id from the request parameters

    const department = await Department.findById({ _id: id }); // Find the department by id

    console.log(department);

    return res.status(200).json({ success: true, department }); // Return a success response with status code 200
  } catch (error) {
    res.status(500).json({ error: "Server error in get department" }); // Return an error response with status code 500
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Get the department id from the request parameters
    const { dep_name, description } = req.body; // Destructure the department name and description from the request body

    const updatedDep = await Department.findByIdAndUpdate(
      { _id: id }, // Find the department by id
      { dep_name, description }, // Update the department name and description
      { new: true } // Return the updated department
    ); // Find the department by id and update the department name and description
    console.log(updatedDep);
    return res.status(200).json({
      success: true,
      department: updatedDep,
      message: "Department updated successfully",
    }); // Return a success response with status code 200
  } catch (error) {
    res.status(500).json({ error: "Server error in update department" }); // Return an error response with status code 500
  }
};

export { addDepartment, getDepartments, getDepartment, updateDepartment }; // Export the addDepartment and getDepartments functions
