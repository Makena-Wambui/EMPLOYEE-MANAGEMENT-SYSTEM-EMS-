// create a connection to the database
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;

    // check if the MONGO_URI is defined
    if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToDatabase;
