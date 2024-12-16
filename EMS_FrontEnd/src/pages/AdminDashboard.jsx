import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AdminDashboard = () => {
  const { user, loading } = useAuth(); // Destructure the user object from the context.

  const navigate = useNavigate(); // Use the useNavigate hook to navigate to different pages.

  if (loading) {
    return <div>Loading...</div>; // If the user is loading, display a loading message
  }

  if (!user) {
    //return <h1>Unauthorized</h1>;
    navigate("/login"); // If the user is not present, navigate to the login page.
  }

  console.log(user); // To check if the user object is available.

  return (
    <div>
      <h1>AdminDashboard {user?.name}</h1>
    </div>
  );
};

export default AdminDashboard;
