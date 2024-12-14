import React from "react";
import { useState } from "react";

const Login = () => {
  {
    /* The Login component is responsible for rendering the login form. */
  }

  {
    /* The email and password state variables are used to store the values of the email and password input fields. */
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    try {
      // Send a POST request to the /api/auth/login endpoint with the email and password in the request body.
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
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
