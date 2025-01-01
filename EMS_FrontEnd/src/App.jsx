import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./pages/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import Summary from "./components/EmployeeDashboard/Summary";

/*
 * The App component is the root component of the application.
 * It is responsible for rendering the appropriate component based on the current route.
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />{" "}
          {/* Define the route for the DepartmentList component */}
          <Route path="add-department" element={<AddDepartment />} />{" "}
          {/* Define the route for the AddDepartment component */}
          <Route path="department/:id" element={<EditDepartment />} />{" "}
          {/* Define the route for the EditDepartment component */}
          <Route path="employees" element={<List />} />{" "}
          {/* Define the route for the List component */}
          <Route path="add-employee" element={<Add />} />{" "}
          {/* Define the route for the Add component */}
          <Route path="employees/:id" element={<View />} />{" "}
          {/* Define the route for the View component */}
          <Route path="employees/edit/:id" element={<Edit />} />{" "}
          {/* Define the route for the Edit component */}
          <Route path="employees/salary/:id" element={<ViewSalary />} />{" "}
          {/* Define the route for the View component */}
          <Route path="salary/add" element={<AddSalary />} />{" "}
          {/* Define the route for the AddSalary component */}
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
