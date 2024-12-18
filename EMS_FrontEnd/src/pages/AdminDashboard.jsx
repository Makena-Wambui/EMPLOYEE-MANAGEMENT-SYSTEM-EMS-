//import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { useAuth } from "../context/authContext";
import AdminSummary from "./AdminSummary";

const AdminDashboard = () => {
  const { user } = useAuth(); // Destructure the user object from the context.

  /*
  const navigate = useNavigate(); // Use the useNavigate hook to navigate to different pages.

  
  if (loading) {
    return <div>Loading...</div>; // If the user is loading, display a loading message
  }

  if (!user) {
    //return <h1>Unauthorized</h1>;
    navigate("/login"); // If the user is not present, navigate to the login page.
  }

  console.log(user); // To check if the user object is available.
  */

  return (
    /*
    The AdminDashboard component is used to display the admin dashboard.
    */
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        {" "}
        {/* Add a flex-1 class to the div to take up the remaining space */}
        <Navbar />
        <AdminSummary />
      </div>
    </div>
  );
};

export default AdminDashboard;
