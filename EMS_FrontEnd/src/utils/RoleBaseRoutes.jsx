import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  /* If the user is loading, display a loading message */
  if (loading) {
    return <div>Loading...</div>;
  }

  /*
    requiredRole is an array that contains the roles that are allowed to access the route.
    If the user's role is not present in the requiredRole array, then the user is unauthorized to access the route.
  */
  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  ); /* If the user is present, render the children components, else navigate to the login page */
};

export default RoleBaseRoutes;
