import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  {
    /* The Login component is responsible for rendering the login form. */
  }

  /* The useState hook is used to create state variables in functional components.
  The email and password state variables are used to store the values of the email and password input fields respectively.
  The error state variable is used to store any error messages that occur during the login process. */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from the auth context.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // const {user} = useContext(userContext);
    e.preventDefault(); // Prevent the default form submission behavior.

    try {
      // Send a POST request to the /api/auth/login endpoint with the email and password in the request body.
      const response = await axios.post(
        "https://employee-management-system-ems-backend.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      // console.log(response);
      if (response.data.token) {
        console.log("Token received:", response.data.token); // Log the token to ensure it's being received
        localStorage.setItem("token", response.data.token); // Store the token in local storage
        login(response.data.user); // Call the login function with the user object from the response

        if (response.data.user.role === "admin") {
          // Redirect the user to the admin dashboard if the user is an admin.
          navigate("/admin-dashboard");
        } else {
          // Redirect the user to the employee dashboard if the user is an employee.
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      // console.error(error);
      if (error.response) {
        setError(error.response.data.message); // Set the error message if the response contains an error message.
      } else {
        setError("An error occurred. Please try again."); // Set a generic error message if no error message is present in the response.
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-5
    0% space-y-6"
    >
      <h2 className="font-firaCode text-3xl text-white">
        Employee Management System
      </h2>

      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display the error message if there is an error. */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)} // Set the value of the email input field to the email state variable.
              required // Make the email input field required.
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)} // Set the value of the password input field to the password state variable.
              required // Make the password input field required.
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="remember" className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="" className="text-teal-600">
              Forgot Password?
            </a>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
