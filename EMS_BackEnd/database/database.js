// create a connection to the database

import mongoose from "mongoose";

// create a function to connect to the database
const connectToDatabase = async () => {
  try {
    // connect to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // log the connection status
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // log the error
    console.log(`Error: ${error.message}`);
    // exit with failure
    process.exit(1);
  }
};

// export the function to connect to the database
export default connectToDatabase;
