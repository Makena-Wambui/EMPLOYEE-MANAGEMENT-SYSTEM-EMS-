import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./pages/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";

{
  /*
   * The App component is the root component of the application.
   * It is responsible for rendering the appropriate component based on the current route.
   */
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />{" "}
          {/* Redirect to /admin-dashboard */}
          <Route path="/login" element={<Login />} />{" "}
          {/* Render the Login component */}
          <Route
            path="/admin-dashboard"
            element={
              /* Wrap the AdminDashboard component with the PrivateRoutes and RoleBaseRoutes components  to ensure that only authenticated users with the role of "admin" can access the route */

              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            <Route
              path="/admin-dashboard/departments"
              element={<DepartmentList />}
            ></Route>

            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            ></Route>
          </Route>
          {/* Render the AdminDashboard component */}
          <Route
            path="/employee-dashboard"
            element={<EmployeeDashboard />}
          />{" "}
          {/* Render the EmployeeDashboard component */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
