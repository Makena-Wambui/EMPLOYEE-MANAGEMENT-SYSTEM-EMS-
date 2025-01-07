import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectToDatabase from "./database/database.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";

connectToDatabase(); // connect to the database
const app = express(); // create express app

app.use(
  cors({
    origin: "https://employee-management-system-ems-front.vercel.app",
    credentials: true,
  })
); // enable cors for all requests to the server to allow requests from any origin

app.use(express.json()); // enable parsing of json request bodies

app.use(express.static("public/uploads")); // serve the uploads folder as a static folder

app.use("/api/auth", authRouter); // use the authRouter for all requests to the /auth endpoint

app.use("/api/department", departmentRouter); // use the departmentRouter for all requests to the /department endpoint

app.use("/api/employee", employeeRouter); // use the employeeRouter for all requests to the /employee endpoint

app.use("/api/salary", salaryRouter); // use the salaryRouter for all requests to the /salary endpoint

app.use("/api/leave", leaveRouter); // use the leaveRouter for all requests to the /leave endpoint

//app.use("/api/leaves", leaveRouter); // use the leaveRouter for all requests to the /leaves endpoint

app.use("/api/setting", settingRouter); // use the settingRouter for all requests to the /setting endpoint

app.use("/api/dashboard", dashboardRouter); // use the dashboardRouter for all requests to the /dashboard endpoint

app.listen(process.env.PORT, () => {
  /*
    Start the server on the port specified in the environment variable PORT
  */
  console.log(`Server is running on port ${process.env.PORT}`);
});
