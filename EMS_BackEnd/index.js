import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import connectToDatabase from "./database/database.js";

connectToDatabase(); // connect to the database
const app = express(); // create express app

app.use(cors()); // enable cors for all requests to the server to allow requests from any origin

app.use(express.json()); // enable parsing of json request bodies

app.use("/api/auth", authRouter); // use the authRouter for all requests to the /auth endpoint

app.listen(process.env.PORT, () => {
  /*
    Start the server on the port specified in the environment variable PORT
  */
  console.log(`Server is running on port ${process.env.PORT}`);
});
