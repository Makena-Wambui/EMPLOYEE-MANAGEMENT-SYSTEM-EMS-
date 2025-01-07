import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate(); // The useNavigate hook provides a navigate function that allows you to navigate to a different location in your application.

  const { user } = useAuth(); // The useAuth hook returns the auth context value.

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }); // The useState hook is used to create a state variable called setting and a function called setSetting to update the state variable. The state variable is initialized with an object that contains the userId, oldPassword, newPassword, and confirmPassword fields.

  const [error, setError] = useState(null); // The useState hook is used to create a state variable called error and a function called setError to update the state variable. The state variable is initialized with a value of null.

  const handleChange = (e) => {
    const { name, value } = e.target; // The handleChange function takes an event object as an argument and extracts the name and value properties from the event target.

    setSetting({ ...setting, [name]: value }); // The setSetting function is called with a new object that spreads the existing setting object and updates the value of the field specified by the name property.
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // The handleSubmit function takes an event object as an argument and calls the preventDefault method to prevent the default form submission behavior.

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match"); // If the newPassword and confirmPassword fields do not match, set the error state variable to "Passwords do not match".
      return;
    } else {
      try {
        const response = await axios.put(
          "https://employee-management-system-ems-backend.vercel.app/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ); // The try block contains an API call using the axiosInstance.post method to send a POST request to the "/auth/change-password" endpoint with the setting object as the request body.

        if (response.status === 200) {
          navigate("/admin-dashboard/employees"); // If the API call is successful and the response status is 200, navigate to the "/admin-dashboard/employees" route.
          setError(null); // Set the error state variable to null.
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message); // If an error occurs during the API call, set the error state variable to the error message returned by the API
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>

          <input
            type="password"
            name="oldPassword"
            placeholder="Change your password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-900 text-white font-bold rounded-md py-2 px-4 mt-6"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
