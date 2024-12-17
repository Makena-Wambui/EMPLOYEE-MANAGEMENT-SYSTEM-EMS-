import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth(); // Destructure the user object and loading from the context api.

  if (loading) {
    return <div>Loading...</div>; // If the user is loading, display a loading message
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  ); /* If the user is present, render the children components, else navigate to the login page */
};

export default PrivateRoutes;
