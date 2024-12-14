import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

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
          <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
          {/* Render the AdminDashboard component */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
