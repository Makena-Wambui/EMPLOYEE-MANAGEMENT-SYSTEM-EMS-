import mongoose from "mongoose";

// define the schema for our user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },

  profileImage: {
    type: String,
    // optional
  },

  createAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// create the model for users and expose it to our app
const User = mongoose.model("User", userSchema);

// export the model
export default User;
