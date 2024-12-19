import mongoose from "mongoose";

// Define the schema for the department model
const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the department model
const Department = mongoose.model("Department", departmentSchema);

export default Department;
