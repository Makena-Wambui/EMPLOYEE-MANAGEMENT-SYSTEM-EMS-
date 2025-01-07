import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

// Define the schema for the department model
const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define the pre hook for the deleteOne method of the department schema to delete the employees and leave records by the department ID
departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id }); // Find the employees by the department ID

      const employeeIds = employees.map((employee) => employee._id); // Get the employee IDs from the employees

      await Employee.deleteMany({ department: this._id }); // Delete the employees by the department ID

      // Delete the user records by the employee IDs
      await Employee.deleteMany({ _id: { $in: employeeIds } });

      await Leave.deleteMany({ employeeId: { $in: employeeIds } }); // Delete the leave records by the employee IDs

      await Salary.deleteMany({ employeeId: { $in: employeeIds } }); // Delete the salary records by the employee IDs

      next(); // Call the next middleware function in the stack if there is no error
    } catch (error) {
      next(error); // Call the next middleware function in the stack with the error
    }
  }
);

// Create the department model
const Department = mongoose.model("Department", departmentSchema);

export default Department;
