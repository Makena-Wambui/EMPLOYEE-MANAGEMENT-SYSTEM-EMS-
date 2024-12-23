import mongoose from "mongoose";
import { Schema } from "mongoose";

/* Employee Schema */
const employeeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },

  employeeId: {
    type: String,
    required: true,
    unique: true,
  },

  dob: {
    type: Date,
  },

  gender: {
    type: String,
  },

  maritalStatus: {
    type: String,
  },

  designation: {
    type: String,
  },

  department: {
    type: Schema.Types.ObjectId,
    ref: "Department", // Reference to Department model
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
