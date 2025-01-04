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
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";

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
          <Route index element={<AdminSummary />} />{" "}
          {/* AdminSummary component is rendered when the route is /admin-dashboard */}
          <Route path="departments" element={<DepartmentList />} />{" "}
          {/* DepartmentList component is rendered when the route is /admin-dashboard/departments */}
          <Route path="add-department" element={<AddDepartment />} />{" "}
          {/* AddDepartment component is rendered when the route is /admin-dashboard/add-department */}
          <Route path="department/:id" element={<EditDepartment />} />{" "}
          {/* EditDepartment component is rendered when the route is /admin-dashboard/department/:id */}
          <Route path="employees" element={<List />} />{" "}
          {/* List component is rendered when the route is /admin-dashboard/employees */}
          <Route path="add-employee" element={<Add />} />{" "}
          {/* Add component is rendered when the route is /admin-dashboard/add-employee */}
          <Route path="employees/:id" element={<View />} />{" "}
          {/* View component is rendered when the route is /admin-dashboard/employees/:id */}
          <Route path="employees/edit/:id" element={<Edit />} />{" "}
          {/* Edit component is rendered when the route is /admin-dashboard/employees/edit/:id */}
          <Route path="employees/salary/:id" element={<ViewSalary />} />{" "}
          {/* ViewSalary component is rendered when the route is /admin-dashboard/employees/salary/:id */}
          <Route path="salary/add" element={<AddSalary />} />{" "}
          {/* AddSalary component is rendered when the route is /admin-dashboard/salary/add */}
          <Route path="leaves" element={<Table />} />{" "}
          {/* Table component is rendered when the route is /admin-dashboard/leaves */}
          <Route path="leaves/:id" element={<Detail />} />{" "}
          {/* Detail component is rendered when the route is /admin-dashboard/leaves/:id */}
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
          {" "}
          {/* EmployeeDashboard component is rendered when the route is /employee-dashboard */}
          <Route index element={<Summary />} />{" "}
          {/* Summary component is rendered when the route is /employee-dashboard */}
          <Route path="profile/:id" element={<View />} />{" "}
          {/* View component is rendered when the route is /employee-dashboard/profile/:id */}
          <Route path="leaves" element={<LeaveList />} />{" "}
          {/* LeaveList component is rendered when the route is /employee-dashboard/leaves */}
          <Route path="add-leave" element={<AddLeave />} />{" "}
          {/* AddLeave component is rendered when the route is /employee-dashboard/add-leave */}
          <Route path="salary/:id" element={<ViewSalary />} />{" "}
          {/* ViewSalary component is rendered when the route is /employee-dashboard/salary/:id */}
          <Route path="settings" element={<Setting />} />{" "}
          {/* Setting component is rendered when the route is /employee-dashboard/settings */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
