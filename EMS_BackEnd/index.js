import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectToDatabase from "./database/database.js";
import salaryRouter from "./routes/salary.js";

connectToDatabase(); // connect to the database
const app = express(); // create express app

app.use(cors()); // enable cors for all requests to the server to allow requests from any origin

app.use(express.json()); // enable parsing of json request bodies

app.use(express.static("public/uploads")); // serve the uploads folder as a static folder

app.use("/api/auth", authRouter); // use the authRouter for all requests to the /auth endpoint

app.use("/api/department", departmentRouter); // use the departmentRouter for all requests to the /department endpoint

app.use("/api/employee", employeeRouter); // use the employeeRouter for all requests to the /employee endpoint

app.use("/api/salary", salaryRouter); // use the salaryRouter for all requests to the /salary endpoint

app.listen(process.env.PORT, () => {
  /*
    Start the server on the port specified in the environment variable PORT
  */
  console.log(`Server is running on port ${process.env.PORT}`);
});
