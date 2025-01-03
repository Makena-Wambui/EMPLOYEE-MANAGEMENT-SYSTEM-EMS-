import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the Leave Schema
const leaveSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  leaveType: {
    type: String,
    enum: ["casual", "sick", "annual"],
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  appliedOn: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Leave model
const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
