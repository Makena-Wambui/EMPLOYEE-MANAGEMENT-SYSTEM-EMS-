import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null); // user state
  const [loading, setLoading] = useState(true); // loading state

  // const navigate = useNavigate();

  // This useEffect hook will run when the component mounts and will verify if the user is logged in by sending a GET request to the /api/auth/verify endpoint
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage

        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify", // Send a GET request to the /api/auth/verify endpoint to verify the user
            {
              headers: {
                Authorization: `Bearer ${token}`, // Send the token stored in local storage as an Authorization header
              },
            }
          ); // Send a GET request to the /api/auth/verify endpoint to verify the user

          if (response.data.user) {
            setUser(response.data.user); // If the response contains a user object, set the user state to the user object
          }
        } else {
          // navigate("/login"); // If the token is not present in local storage, navigate to the login page
          setUser(null);
        }
      } catch (error) {
        //console.error(error);
        if (error.response) {
          // If the response contains an error message, navigate to the login page
          // navigate("/login");
          setUser(null);
        }
      } finally {
        setLoading(false); // Set the loading state to false
      }
    };
    // Call the verifyUser function when the component mounts
    verifyUser();
  }, []);

  // This function will be called when the user logs in
  const login = (user) => {
    setUser(user); // Set the user state to the user object
  };

  // This function will be called when the user logs out
  const logout = () => {
    setUser(null); // Set the user state to null
    localStorage.removeItem("token"); // Remove the token from local storage
  };
  return (
    // The userContext.Provider will provide the user state and the login and logout functions to all the components that are wrapped inside it
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;
